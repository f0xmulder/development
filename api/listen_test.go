// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"github.com/stretchr/testify/assert"
	"go.uber.org/zap"
	"io/ioutil"
	"net/http/httptest"
	"testing"
)

func TestGetAvailableAPIs(t *testing.T) {
	expectedList := []api{
		{OrganizationName: "Test"},
	}

	actualList := getAvailableAPIs()

	assert.Equal(t, expectedList, actualList)
}

func mockGetAvailableAPIs() []api {
	return []api{}
}

func TestListAPIsHandler(t *testing.T) {
	logger := zap.NewNop()

	req := httptest.NewRequest("GET", "/list", nil)
	w := httptest.NewRecorder()

	listAPIsHandler(logger, mockGetAvailableAPIs)(w, req)

	resp := w.Result()

	body, _ := ioutil.ReadAll(resp.Body)

	assert.Equal(t, 200, resp.StatusCode)
	assert.Equal(t, "application/json", resp.Header.Get("Content-Type"))
	assert.Equal(t, "[]\n", string(body))
}
