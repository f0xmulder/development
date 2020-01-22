package database

import (
	"database/sql"
	"io/ioutil"
	"os"

	"go.uber.org/zap"
)

// Add fixtures contained in the SQL file found at fixturesPath to the database
func AddFixtures(logger *zap.Logger, fixturesPath string, db *sql.DB) {
	wd, err := os.Getwd()
	if err != nil {
		logger.Fatal("failed to get wd", zap.Error(err))
	}
	logger.Info("adding fixtures", zap.String("fixturesPath", fixturesPath), zap.String("wd", wd))
	content, err := ioutil.ReadFile(fixturesPath)
	if err != nil {
		logger.Fatal("failed to read fixtures", zap.Error(err))
	}

	sql := string(content)

	_, err = db.Exec(sql)
	if err != nil {
		logger.Fatal("failed to execute fixture SQL", zap.Error(err))
	}

	logger.Info("adding fixtures completed")
}
