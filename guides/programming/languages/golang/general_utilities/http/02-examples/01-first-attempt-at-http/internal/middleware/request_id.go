package middleware

import (
	"net/http"
	"strconv"
	"sync/atomic"
)

var counter atomic.Uint64

func RequestID(next http.Handler) http.Handler {
	request_id := func(w http.ResponseWriter, r *http.Request) {
		id := strconv.FormatUint(counter.Add(1), 10)

		w.Header().Set("X-Request-ID", id)

		next.ServeHTTP(w, r)
	}

	return http.HandlerFunc(request_id)
}
