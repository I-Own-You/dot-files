package main

import (
	"fmt"
	"net/http"
)

// an http server is easy to write using net/http

// a fundamental concept in net/http servers is handlers.
// a handler is an object implementing the http.Handler interface.
//
// a common way to write a handler is
// by using the http.HandlerFunc adapter on functions with the appropriate signature.

// functions serving as handlers take a http.ResponseWriter and a http.Request as arguments.
func hello(w http.ResponseWriter, req *http.Request) {
	// the response writer is used to fill in the HTTP response. Here our simple response is just “hello\n”.
	fmt.Fprintf(w, "hello\n")
}

// this handler does something a little more sophisticated by reading all the HTTP request headers and,
// echoing them into the response body.
func headers(w http.ResponseWriter, req *http.Request) {
	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
}

// you could also implement the handler interface and use it in .Handle() but HandleFunc is idiomatic
type myHandler struct{} // here could be any type

func (mh myHandler) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "custom handler\n")
}

// ServeHTTP(ResponseWriter, *Request)

func HttpServer() {

	// we register our handlers on server routes using the http.HandleFunc convenience function.
	//  it sets up the default router in the net/http package and takes a function as an argument.
	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)

	http.Handle("/kek", myHandler{}) // you can assign a variable before, or just throw myHandler{}

	// finally, we call the ListenAndServe with the port and a handler.
	// nil tells it to use the default router we’ve just set up: "/hello", "/headers", "/kek"
	http.ListenAndServe(":8090", nil)
}
