package middleware

import (
	"net/http"
	"slices"
)

type Middleware func(http.Handler) http.Handler

func Chain(mux *http.ServeMux, mws ...Middleware) http.Handler {
	h := http.Handler(mux)

	for _, mw := range slices.Backward(mws) {
		h = mw(h)
	}

	return h

}
