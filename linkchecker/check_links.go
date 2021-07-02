package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"linkchecker/gitlab"
)

const (
	PARALLEL_REQUESTS = 50
	QUERY_BUFFER      = PARALLEL_REQUESTS
	RESULT_BUFFER     = PARALLEL_REQUESTS
)

var (
	DB_HOST             = "localhost"
	DB_PORT             = "5432"
	DB_USER             = "don"
	DB_PASSWORD         = "don"
	DB_NAME             = "don"
	GITLAB_URL          = "https://gitlab.com"
	GITLAB_PROJECT_ID   = "18975726" // https://gitlab.com/commonground/don/don-issues-test/
	GITLAB_ACCESS_TOKEN *string
	HTTP_TIMEOUT        = 5 * time.Minute
	// Report to Gitlab after this many consecutive failures
	FAILED_PROBES_TO_REPORT = 24
)

type dbUrl struct {
	Id  int
	Url string
}

type result struct {
	url       dbUrl
	timestamp time.Time
	status    sql.NullInt32
	err       *error
}

func (r *result) Ok() bool {
	return r.status.Valid && r.status.Int32 == 200
}

func panicOnErr(err error) {
	if err != nil {
		log.Panic(err)
	}
}

func getDbCreds() {
	if dbHost, ok := os.LookupEnv("DB_HOST"); ok {
		DB_HOST = dbHost
	}
	if dbPort, ok := os.LookupEnv("DB_PORT"); ok {
		DB_PORT = dbPort
	}
	if dbUser, ok := os.LookupEnv("DB_USER"); ok {
		DB_USER = dbUser
	}
	if dbPassword, ok := os.LookupEnv("DB_PASSWORD"); ok {
		DB_PASSWORD = dbPassword
	}
	if dbName, ok := os.LookupEnv("DB_NAME"); ok {
		DB_NAME = dbName
	}
}

func getGitlabConfig() gitlab.Config {
	if gitlabUrl, ok := os.LookupEnv("GITLAB_URL"); ok {
		GITLAB_URL = gitlabUrl
	}
	if gitlabProjectId, ok := os.LookupEnv("GITLAB_PROJECT_ID"); ok {
		GITLAB_PROJECT_ID = gitlabProjectId
	}
	if gitlabAccessToken, ok := os.LookupEnv("GITLAB_ACCESS_TOKEN"); ok {
		GITLAB_ACCESS_TOKEN = &gitlabAccessToken
	}

	if GITLAB_ACCESS_TOKEN == nil {
		panic("No GITLAB_ACCESS_TOKEN environment variable found")
	}
	return gitlab.Config{GITLAB_URL, *GITLAB_ACCESS_TOKEN, GITLAB_PROJECT_ID}
}

func getDb() *sqlx.DB {
	getDbCreds()

	log.Printf("connecting to database %v@%v:%v %v", DB_USER, DB_HOST, DB_PORT, DB_NAME)
	connectionString := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s",
		DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME)

	db, err := sqlx.Connect("postgres", connectionString)
	panicOnErr(err)
	return db
}

func main() {
	db := getDb()
	defer db.Close()
	checkLinks(db)
}

func checkLinks(db *sqlx.DB) {
	if !enabled(db) {
		log.Print("linkchecker is disabled in the database, exiting")
		return
	}

	findUrls(db)

	checkAndSaveUrls(db)

	reportNewBrokenLinks(db)
}

func enabled(db *sqlx.DB) (enabled bool) {
	enabled = true
	err := db.Get(&enabled, `SELECT enabled FROM core_config WHERE variable = 'linkchecker'`)
	if err != nil && err != sql.ErrNoRows {
		log.Panic(err)
	}
	return
}

func findUrls(db *sqlx.DB) {
	// Look for urls in the api tables, and save them to core_url
	// This could also be done at api load time but having one place where it is done is simpler
	_, err := db.Exec(`
		INSERT INTO core_url (url)
			SELECT url FROM (
				SELECT forum_url AS url FROM core_api
				UNION
				SELECT contact_url FROM core_api
				UNION
				SELECT api_url FROM core_environment
				UNION
				SELECT specification_url FROM core_environment
				UNION
				SELECT documentation_url FROM core_environment
			) AS url
			WHERE url IS NOT NULL
				AND url != ''
				AND url NOT IN (SELECT url FROM core_url);

		INSERT INTO core_urlapilink (url_id, api_id, field)
			SELECT core_url.id, api_id, field
			FROM (
				SELECT id as api_id, forum_url AS url, 'forum' AS field FROM core_api
				UNION
				SELECT id as api_id, contact_url, 'contact' FROM core_api
				UNION
				SELECT core_api.id, api_url, name||'_api' FROM core_environment
					LEFT JOIN core_api USING (api_id)
				UNION
				SELECT core_api.id, specification_url, name||'_spec' FROM core_environment
					LEFT JOIN core_api USING (api_id)
				UNION
				SELECT core_api.id, documentation_url, name||'_doc' FROM core_environment
					LEFT JOIN core_api USING (api_id)
			) AS urltable
			LEFT JOIN core_url USING (url)
			WHERE url != ''
				AND (core_url.id, api_id, field) NOT IN (
					SELECT url_id, api_id, field FROM core_urlapilink);
		`)
	panicOnErr(err)
}

func checkAndSaveUrls(db *sqlx.DB) {
	var urlcount int
	err := db.Get(&urlcount, `
		SELECT count(*)
		FROM (
			SELECT url
			FROM core_url
			LEFT JOIN core_urlapilink link ON core_url.id = link.url_id
			GROUP BY url
			HAVING count(link.id) > 0
		) urls
	`)
	panicOnErr(err)

	rows, err := db.Queryx(`
		SELECT core_url.id, url
		FROM core_url
		LEFT JOIN core_urlapilink link ON core_url.id = link.url_id
		GROUP BY core_url.id, url
		HAVING count(link.id) > 0
	`)
	panicOnErr(err)

	urls := make(chan dbUrl, QUERY_BUFFER)

	go func() {
		defer close(urls)
		for rows.Next() {
			var url dbUrl
			err := rows.StructScan(&url)
			panicOnErr(err)
			urls <- url
		}
		panicOnErr(rows.Err())
	}()

	results := checkUrls(urls)
	saveResults(db, urlcount, results)
}

func checkUrls(urls <-chan dbUrl) <-chan result {
	var results = make(chan result, RESULT_BUFFER)

	waitgroup := new(sync.WaitGroup)
	waitgroup.Add(PARALLEL_REQUESTS)
	for i := 1; i <= PARALLEL_REQUESTS; i++ {
		go probeUrls(urls, results, waitgroup)
	}

	go func() {
		waitgroup.Wait()
		close(results)
	}()

	return results
}

func probeUrls(urls <-chan dbUrl, results chan<- result, waitgroup *sync.WaitGroup) {
	defer waitgroup.Done()
	httpClient := http.Client{Timeout: HTTP_TIMEOUT}
	for u := range urls {
		timestamp := time.Now()
		resp, err := httpClient.Get(u.Url)
		if err != nil {
			unwrapped := err
			if urlerr, ok := err.(*url.Error); ok {
				unwrapped = urlerr.Err
			}
			results <- result{u, timestamp, sql.NullInt32{}, &unwrapped}
			continue
		}
		resp.Body.Close()

		results <- result{
			u, timestamp, sql.NullInt32{Int32: int32(resp.StatusCode), Valid: true}, nil}
	}
}

func saveResults(db *sqlx.DB, total int, results <-chan result) {
	queryslice := []byte("INSERT INTO core_urlprobe (url_id, timestamp, status_code, error) VALUES \n")

	log.Printf("Retrieving %v urls...", total)
	args := make([]interface{}, 0, total*4)
	count := 0
	errors := 0
	for result := range results {
		count++
		if !result.Ok() {
			errors++
		}

		error := ""
		if result.err != nil {
			error = (*result.err).Error()
		}
		queryslice = append(queryslice, "(?, ?, ?, ?),\n"...)
		args = append(args, result.url.Id, result.timestamp.Format(time.RFC3339Nano), result.status, error)

		if !result.Ok() {
			fmt.Print("\r")
			if result.status.Valid {
				log.Println("Error: Get", result.url.Url, "returned status code", result.status.Int32)
			} else {
				log.Printf("Error retrieving %s: %s", result.url.Url, (*result.err).Error())
			}
		}

		fmt.Printf("\r%v/%v", count, total)
	}
	fmt.Println("...Done")

	// Remove trailing comma and translate to current DB
	query := db.Rebind(string(queryslice[:len(queryslice)-2]))

	if count == 0 {
		log.Println("No urlprobes to save")
		return
	}

	log.Println(count, "urls probed,", errors, "errors found")

	result, err := db.Exec(query, args...)
	panicOnErr(err)
	rows, err := result.RowsAffected()
	if err == nil {
		log.Println("Saved", rows, "url probes")
	} else {
		log.Println("Saved url probes")
	}
}

func _ideHint(db *sqlx.DB) { db.Exec(newBrokenLinksQuery) } // Makes intellij syntax-highlight the query
const newBrokenLinksQuery = `
	WITH
		url_info AS (
			SELECT
				url.id,
				url.url,
				string_agg(link.field || ' url for ' || api.api_id, '; ') link_info
			FROM core_url url
			INNER JOIN core_urlapilink link ON url.id = link.url_id
			INNER JOIN core_api api ON link.api_id = api.id
			GROUP BY url.id, url.url),

		probes AS (
			SELECT
				url,
				row_number() OVER (PARTITION BY url_id ORDER BY timestamp DESC) rownum,
				timestamp,
				coalesce(status_code = 200, false) ok,
				coalesce('Status code ' || status_code, error) errmsg,
				link_info
			FROM core_urlprobe probe
			INNER JOIN url_info ON probe.url_id = url_info.id)

	SELECT
		url,
		-- We give only the first probe for a url a non-null errmsg and link_info,
		-- so this hack only returns a single message. Where is any_value()!
		string_agg(errmsg, ',') errmsg,
		string_agg(link_info, ',') link_info
	FROM (
		SELECT
			url,
			rownum,
			timestamp,
			ok,
			CASE WHEN rownum != 1 THEN NULL ELSE errmsg END AS errmsg,
			CASE WHEN rownum != 1 THEN NULL ELSE link_info END AS link_info
		FROM probes
	) AS ranked
	WHERE rownum <= ? + 1
	GROUP BY url
	HAVING count(*) >= ?
		AND every(
			-- if A then B === not(A) or B  -- SQL does not support a logical if/else, so I use 'not A or B' instead.
			-- The last 24 probes failed
			(NOT(rownum <= ?) OR NOT ok)
			-- but the 25th succeeded (if it exist)
			AND (NOT(rownum = ? + 1) OR ok)
		)
	`

func reportNewBrokenLinks(db *sqlx.DB) {
	var errorUrls []struct {
		Url       string
		Errmsg    string
		Link_info string
	}
	err := db.Select(&errorUrls, db.Rebind(newBrokenLinksQuery),
		FAILED_PROBES_TO_REPORT, FAILED_PROBES_TO_REPORT, FAILED_PROBES_TO_REPORT, FAILED_PROBES_TO_REPORT)
	panicOnErr(err)

	if len(errorUrls) == 0 {
		log.Println("No newly broken urls found")
		return
	}

	urls := []string{}
	for _, errUrl := range errorUrls {
		urls = append(urls, errUrl.Url)
	}
	log.Printf("Found %v newly broken url(s): %s", len(errorUrls), strings.Join(urls, "\n"))

	bodyText := fmt.Sprintf("**(%s) The following links have been broken for the last 24 hours:**\n\n",
		time.Now().Format("2 January 2006 15:04"))
	for _, errUrl := range errorUrls {
		bodyText += fmt.Sprintf(" - %s: %s (%s)\n", errUrl.Url, errUrl.Errmsg, errUrl.Link_info)
	}

	gitlabConfig := getGitlabConfig()
	body := gitlab.CreateIssueBody{
		Title:       "Broken links found",
		Description: bodyText,
		Weight:      "",
		Labels:      "Broken Link",
	}

	// TODO: if reporting to gitlab fails, make sure the urls will be reported the next time
	issue, err := gitlab.CreateIssue(gitlabConfig, body)
	panicOnErr(err)
	log.Println("New issue created at", issue.WebURL)
}
