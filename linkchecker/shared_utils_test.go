package main

import (
	"io/ioutil"
	"os"
	"runtime/debug"
	"testing"

	"github.com/jmoiron/sqlx"
)

// args[0] or args[1] is expected to be an error. If it is nil, do nothing. If not, fail the test and include a
// stacktrace. If args[1] is the error args[0] must be a string.
func failErr(t *testing.T, args ...interface{}) {
	if len(args) > 0 && args[0] == nil {
		return
	}
	if len(args) > 1 && isString(args[0]) && args[1] == nil {
		return
	}
	t.Fatal(append(args, []interface{}{"\n" + string(debug.Stack())}...)...)
}

func failErrSql(t *testing.T, args ...interface{}) {
	failErr(t, append([]interface{}{"SQL Error:"}, args...)...)
}

func isString(arg interface{}) bool {
	_, ok := arg.(string)
	return ok
}

func getTestDb(t *testing.T) *sqlx.DB {
	defer func() {
		if err := recover(); err != nil {
			t.Log("Unable to connect to test database, did you run create_test_db.sh?\nOriginal error:")
			panic(err)
		}
	}()

	DB_NAME = "don-test"
	if dbName, ok := os.LookupEnv("DB_TEST_NAME"); ok {
		os.Setenv("DB_NAME", dbName)
	} else {
		os.Unsetenv("DB_NAME")
	}

	db := getDb()

	schemafile, err := os.Open("testdata/testschema.sql")
	failErr(t, err)
	schema, err := ioutil.ReadAll(schemafile)
	failErr(t, err)
	schemafile.Close()

	_, err = db.Exec(string(schema))
	failErrSql(t, err)

	return db
}

func clearDb(db *sqlx.DB, t *testing.T) {
	sqlfile, err := os.Open("testdata/flush.sql")
	failErr(t, err)
	flushcmd, err := ioutil.ReadAll(sqlfile)
	failErr(t, err)
	sqlfile.Close()

	_, err = db.Exec(string(flushcmd))
	failErrSql(t, err)

	db.Close()
}

func dbVersion(db *sqlx.DB, t *testing.T) (version string) {
	err := db.Get(&version, `SELECT version()`)
	failErrSql(t, err)
	return
}
