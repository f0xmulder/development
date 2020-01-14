// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package main

import (
	"gitlab.com/commonground/developer.overheid.nl/validate"
	"log"

	"github.com/jessevdk/go-flags"
)

var options struct {
	DirectoryToValidate string `long:"directory-to-validate" env:"DIRECTORY_TO_VALIDATE" default:"../data/apis" description:"Path to the directory for which the data should be validated"`
}

func main() {
	// Parse options
	args, err := flags.Parse(&options)
	if err != nil {
		if et, ok := err.(*flags.Error); ok {
			if et.Type == flags.ErrHelp {
				return
			}
		}
		log.Fatalf("error parsing flags: %v", err)
	}
	if len(args) > 0 {
		log.Fatalf("unexpected arguments: %v", args)
	}

	directoryValidation := validate.Directory(options.DirectoryToValidate)

	if !directoryValidation.Valid {
		log.Fatalf("directory '%s' contains one or more invalid API definition files. %s", options.DirectoryToValidate, directoryValidation.Reason)
	}
}
