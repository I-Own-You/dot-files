package users

// routes files are for endpoints manipulation

import (
	"net/http"
)

func Routes(mux *http.ServeMux, handler *Handler) {
	// 1. this way you would add a specific middleware to an endpoint
	// mux.HandleFunc("POST /users", applyMiddlewares(handler))

	mux.HandleFunc("POST /users", handler.Create)
	mux.HandleFunc("GET /users/{id}", handler.Get)
}

// func applyMiddlewares(h *Handler) http.HandlerFunc {
//  1. if middleware is used only by this endpoint domain, you usually will define middlewares in:
//     internal/api/users/middleware/my_middleware_n.go and import here
//
// 	handler := middleware.RequestID(http.HandlerFunc(h.Create))

// 1. the checking is kind of not needed since down the road we will break everything if we dont pass
//    a compatible signature into middleware.RequestID() and even inside h.Create will break things,
//    but its always good to check on errors even if it will mostly never fire.
//
// 	_, ok := handler.(http.HandlerFunc)
// 	if !ok {
// 		panic("Couldnt cast user h.Create handler from http.Handler into http.HandlerFunc")
// 	}

// 	return handler.(http.HandlerFunc)
// }
