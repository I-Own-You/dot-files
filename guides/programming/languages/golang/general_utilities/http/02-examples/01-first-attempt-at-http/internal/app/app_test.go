package app

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestUserCreate(t *testing.T) {
	app := New()

	app.Middlewares()
	app.Routes()
	app.serverConfig()

	server := httptest.NewServer(app.server.Handler)
	server.Config.Addr = app.server.Addr
	defer server.Close()

	resp, err := http.Post(server.URL+"/users", "application/json", strings.NewReader(`{"name": "Ana"}`))

	// 1. t.Run() is used when you want want subtests which will run no matter if other failed because
	//    now, if some test fails, no code below it executes.
	//
	// t.Run("try post method", func(t *testing.T) {
	if err != nil {
		t.Fatalf("error while executing post method: %v", err.Error())
	}
	// })

	// t.Run("try user creation", func(t *testing.T) {
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("expecteed 201, got %d", resp.StatusCode)
	}
	// })
}
