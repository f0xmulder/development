package main

import (
	"os"
	"regexp"
	"strings"
	"testing"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

const projectId = "18975726"

func TestHTTPDisabled(t *testing.T) {
	db := getTestDb(t)
	defer db.Close()

	_, err := db.Exec(`
		INSERT INTO core_config VALUES (1, 'linkchecker', 0);
		-- Drop table so we can detect if checkLinks tries to continue
		DROP TABLE core_url
	`)
	failErrSql(t, err)

	defer func() {
		msg := recover()
		if msg == nil {
			return
		}
		t.Error("checkLinks did not respect being disabled. Got panic:", msg)
	}()
	checkLinks(db)
}

func TestHTTP(t *testing.T) {
	db := getTestDb(t)
	t.Log("running with sqlite version", sqliteVersion(db, t))

	server := runTestServer(nullLogger{})
	defer server.Close()
	setTestGitlabUrl(t, server.httpServer.URL)

	loadHttpTestData(db, t, server)

	FAILED_PROBES_TO_REPORT = 3
	// The timeout should be large enough so that any random slowness in the gitlab ci test runner does not cause
	// spurious breakage, but small enough to have speedy tests.
	HTTP_TIMEOUT = 200 * time.Millisecond

	i := 1
	for ; i <= FAILED_PROBES_TO_REPORT-1; i++ {
		checkLinks(db)
		verifyGitlabSubmissions(t, i, server.getGitlabSubmissions(), []string{})
	}
	checkLinks(db)
	verifyGitlabSubmissions(t, i, server.getGitlabSubmissions(), alwaysFailingUrls(server))

	i++
	checkLinks(db)
	verifyGitlabSubmissions(t, i, server.getGitlabSubmissions(), startsFailingUrl(server))

	probesCount := 0
	expectedProbesCount := len(getTestUrls(server)) * i
	failErrSql(t, db.Get(&probesCount, `SELECT count(*) FROM core_urlprobe`))
	if probesCount != expectedProbesCount {
		t.Errorf("Unexpected number of probes found, expected %d, found %d", expectedProbesCount, probesCount)
	}
}

func setTestGitlabUrl(t *testing.T, url string) {
	failErr(t, os.Setenv("GITLAB_URL", url))
	failErr(t, os.Setenv("GITLAB_PROJECT_ID", projectId))
	failErr(t, os.Setenv("GITLAB_ACCESS_TOKEN", "secretToken"))
}

func loadHttpTestData(db *sqlx.DB, t *testing.T, server testServer) {
	_, err := db.Exec(`
		INSERT INTO  core_api (api_id, api_authentication, api_type,
		                       contact_email, contact_phone, contact_url,
		                       description,
		                       forum_url, forum_vendor,
		                       is_reference_implementation,
		                       organization_name, service_name)
		VALUES ('test-api', 'none', 'rest_json',
		        '', '', '',
		        'Test api',
		        '', '',
		        false,
		        'DON developers', 'Linkchecker test api')
	`)
	failErrSql(t, err)

	for _, path := range getTestUrls(server) {
		_, err := db.Exec(`
			INSERT INTO core_environment (name, api_url, specification_url, documentation_url, api_id)
			VALUES ('demo', ?, '', '', 'test-api')
		`, path)
		failErrSql(t, err)
		t.Log(path)
	}
}

func getTestUrls(s testServer) []string {
	paths := []string{
		"http://" + s.closedServer.Addr() + "/closedPort",
		"http://" + s.emptyResponseServer.Addr() + "/emptyResponse",
		"http://" + s.resetServer.Addr() + "/resetConn",
		strings.ReplaceAll(s.httpServer.URL, "http", "https") + "/invalidHttps"}

	for path, _ := range getHandlers(nil, nil, &handler{}) {
		paths = append(paths, s.httpServer.URL+path)
	}
	return paths
}

func alwaysFailingUrls(s testServer) []string {
	paths := getTestUrls(s)
	var failing []string
	for _, p := range paths {
		if !(strings.HasSuffix(p, "/ok") ||
			strings.HasSuffix(p, "/ok2") ||
			strings.HasSuffix(p, "/startToFail")) {
			failing = append(failing, p)
		}
	}
	return failing
}

func startsFailingUrl(s testServer) []string {
	for _, u := range getTestUrls(s) {
		if strings.HasSuffix(u, "/startToFail") {
			return []string{u}
		}
	}
	panic("unreachable: /startToFail url not found")
}

func verifyGitlabSubmissions(t *testing.T, run int, gitlabPosts, expectedUrls []string) {
	urlRegex, err := regexp.Compile(`\\n - (https?://[0-9a-zA-Z.]+:[0-9]+/[a-zA-Z]+/?)`)
	failErr(t, err)

	missingUrls := make(map[string]bool)
	unexpectedUrls := make(map[string]bool)
	for _, u := range expectedUrls {
		missingUrls[u] = true
	}

	for _, post := range gitlabPosts {
		for _, matchGroup := range urlRegex.FindAllStringSubmatch(post, -1) {
			submittedUrl := matchGroup[1]
			unexpectedUrls[submittedUrl] = true
			if missingUrls[submittedUrl] {
				delete(missingUrls, submittedUrl)
				delete(unexpectedUrls, submittedUrl)
			}
		}
	}

	for u := range missingUrls {
		t.Errorf("%s not submitted to github on run %d", u, run)
	}
	for u := range unexpectedUrls {
		t.Errorf("url %s should not have been submitted to Github in run %d", u, run)
	}
}
