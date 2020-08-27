package main

import (
	"fmt"
	"testing"

	"github.com/jmoiron/sqlx"
)

func loadLinkReportTestData(db *sqlx.DB, t *testing.T) {
	_, err := db.Exec(`
		INSERT INTO  core_api (id, api_id, api_authentication, api_type,
		                       contact_email, contact_phone, contact_url,
		                       description,
		                       forum_url, forum_vendor,
		                       is_reference_implementation,
		                       organization_name, service_name)
		VALUES (1, 'test-api', 'none', 'rest_json',
		        '', '', '',
		        'Test api',
		        '', '',
		        false,
		        'DON developers', 'Linkchecker test api');

        INSERT INTO core_url VALUES
            (1, 'http://allfail'),   --  all probes fail
            (2, 'http://allok'),     --  all probes succeed
            (3, 'http://startfail'), --  the last 24 probes fail, the 25th succeeded
            (4, 'http://endfail'),   --  the last 24 probes succeeded, the 25th failed
            (5, 'http://firstfail'), --  the last 24 probes failed, there are only 24 probes
            (6, 'http://firstok'),   --  the last 24 probes succeeded, there are only 24 probes
            (7, 'http://singlefail'),--  there is only one probe, which failed
            (8, 'http://singleok');  --  there is only one probe, which succeeded

		INSERT INTO core_urlapilink (api_id, field, url_id)
			SELECT 1, 'test_field', id
			  FROM core_url;

        -- in sqlite a numeric value can be used as timestamp, it will be interpreted as a unix time
        -- These are the oldest probes, with timestamp = 0
        INSERT INTO core_urlprobe VALUES
            (0, 0, 400, '', 1), -- allfail
            (1, 0, 200, '', 2), -- allok
            (2, 0, 200, '', 3), -- startfail
            (3, 0, 400, '', 4), -- endfail
            -- no entries for firstfail/firstok
            (4, 0, 400, '', 7), -- singlefail
            (5, 0, 200, '', 8)  -- singleok
        `)
	failErrSql(t, err)
	for i := 1; i <= FAILED_PROBES_TO_REPORT; i++ {
		_, err = db.Exec(`
            INSERT INTO core_urlprobe VALUES
                (?, ?, 400, '', 1), -- allfail
                (?, ?, 200, '', 2), -- allok
                (?, ?, 400, '', 3), -- startfail
                (?, ?, 200, '', 4), -- endfail
                (?, ?, 400, '', 5), -- firstfail
                (?, ?, 200, '', 6); -- firstok
                `,
			6*i, i,
			6*i+1, i,
			6*i+2, i,
			6*i+3, i,
			6*i+4, i,
			6*i+5, i)
		failErrSql(t, err)
	}
}

// To verify the test data
func printTestData(db *sqlx.DB, t *testing.T) {
	urlProbes := map[string][]string{}

	var urls []string
	err := db.Select(&urls, "SELECT url FROM core_url")
	failErrSql(t, err)
	for _, u := range urls {
		urlProbes[u] = []string{}
	}
	t.Log("db test urls:", urls)

	var probes []struct {
		Url         string
		Timestamp   string
		Status_code int // DB.Select doesn't understand StatusCode
		Error       string
	}
	err = db.Select(&probes, `
        SELECT url, timestamp, status_code, error
        FROM core_url LEFT JOIN core_urlprobe
        ON core_url.id = core_urlprobe.url_id
        `)
	failErrSql(t, err)
	for _, p := range probes {
		errmsg := ""
		if p.Error != "" {
			errmsg = ", error: " + p.Error
		}
		urlProbes[p.Url] = append(urlProbes[p.Url], fmt.Sprintf("\nt=%s,status %d%s", p.Timestamp, p.Status_code, errmsg))
	}
	for u, p := range urlProbes {
		t.Logf("test probes for %s: %v", u, p)
	}
}

func TestNewBrokenLinksQuery(t *testing.T) {
	db := getTestDb(t)

	t.Log("Sqlite version:", sqliteVersion(db, t))
	loadLinkReportTestData(db, t)
	printTestData(db, t)

	rows, err := db.Queryx(
		rebind(db, newBrokenLinksQuery),
		FAILED_PROBES_TO_REPORT, FAILED_PROBES_TO_REPORT, FAILED_PROBES_TO_REPORT, FAILED_PROBES_TO_REPORT,
	)
	failErrSql(t, err)

	var failureReport struct {
		Url       string
		Errmsg    string
		Link_info string
	}
	expectedReports := map[string]string{
		"http://firstfail": "",
		"http://startfail": "",
	}
	for rows.Next() {
		err = rows.StructScan(&failureReport)
		failErr(t, err)
		if _, ok := expectedReports[failureReport.Url]; !ok {
			t.Errorf("unexpected url reported: %s", failureReport.Url)
		}
		delete(expectedReports, failureReport.Url)
	}
	for nf := range expectedReports {
		t.Errorf("%s should have been reported but was not", nf)
	}
}
