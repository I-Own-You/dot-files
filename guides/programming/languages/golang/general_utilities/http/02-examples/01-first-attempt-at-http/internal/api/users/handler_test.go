package users

// this file is indented to have test related to its domain and specifically
// handler.go file being tested, this is why its called handler_test.go

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestUserCreate(t *testing.T) {

	repo := NewRepository()
	service := NewService(repo)
	handler := NewHandler(service)

	req := httptest.NewRequest(http.MethodPost, "/users", strings.NewReader(`{"name": "Ana"}`))
	rec := httptest.NewRecorder()

	handler.Create(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("expecteed 201, got %d", rec.Code)
	}
}
