package main

import (
	"io/ioutil"
	"os"
	"runtime/debug"
	"testing"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
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
	db, err := sqlx.Connect("sqlite3", ":memory:")
	failErr(t, err)

	schemafile, err := os.Open("testdata/testschema.sql")
	failErr(t, err)
	schema, err := ioutil.ReadAll(schemafile)
	failErr(t, err)
	schemafile.Close()

	_, err = db.Exec(string(schema))
	failErrSql(t, err)

	return db
}

func sqliteVersion(db *sqlx.DB, t *testing.T) (sqliteversion string) {
	err := db.Get(&sqliteversion, `SELECT sqlite_version()`)
	failErrSql(t, err)
	return
}
