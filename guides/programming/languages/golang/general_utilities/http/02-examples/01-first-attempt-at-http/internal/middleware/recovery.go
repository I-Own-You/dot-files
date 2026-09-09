package middleware

import (
	"log"
	"net/http"
)

func Recovery(next http.Handler) http.Handler {
	recovery := func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("panic: %v\n", err)
				http.Error(w, "internal server error", http.StatusInternalServerError)
			}
		}()

		next.ServeHTTP(w, r)
	}

	return http.HandlerFunc(recovery)
}
