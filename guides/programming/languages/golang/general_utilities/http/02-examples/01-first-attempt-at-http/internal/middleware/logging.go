package middleware

import (
	"log"
	"net/http"
	"time"
)

func Logging(next http.Handler) http.Handler {
	logger := func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// log.Println("Request started: ")

		next.ServeHTTP(w, r)

		log.Printf("%s %s %v\n", r.Method, r.URL.Path, time.Since(start))
	}

	return http.HandlerFunc(logger)
}
