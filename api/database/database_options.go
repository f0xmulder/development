package database

// DatabaseOptions contains go-flags fields which can be used to configure a database
type DatabaseOptions struct {
	PostgresDSN    string `long:"postgres-dsn" env:"POSTGRES_DSN" default:"postgres://don:don@localhost/don?sslmode=disable" description:"Postgres Connection String. See https://godoc.org/github.com/lib/pq#hdr-Connection_String_Parameters."`
	MigrationsPath string `long:"migrations-path" default:"../migrations" env:"MIGRATIONS_PATH" description:"Path to directory where the migration files are located."`
}
