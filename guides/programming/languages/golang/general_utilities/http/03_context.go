package main

import (
	"fmt"
	"net/http"
	"time"
)

// http servers are useful for demonstrating the usage of context.Context for controlling cancellation.
//
// Context carries deadlines, cancellation signals,
// and other request-scoped values across API boundaries and goroutines.

// there is also separate package called context with similar things but for general context

func helloContext(w http.ResponseWriter, req *http.Request) {

	// a context.Context is created for each request by the net/http machinery,
	// and is available with the Context() method.
	ctx := req.Context()
	fmt.Println("server: hello handler started")
	defer fmt.Println("server: hello handler ended")

	select {
	// wait for a few seconds before sending a reply to the client.
	// this could simulate some work the server is doing.
	case <-time.After(10 * time.Second):
		fmt.Fprintf(w, "hello\n")
		// while working,
		// keep an eye on the context’s Done() channel for a signal that we should cancel the work and,
		// return as soon as possible.
	case <-ctx.Done():
		// the context’s Err() method returns an error that explains why the Done() channel was closed.
		err := ctx.Err()
		fmt.Println("server:", err)
		internalError := http.StatusInternalServerError
		http.Error(w, err.Error(), internalError)
	}
}

func ContextExample() {

	http.HandleFunc("/hello", helloContext)
	http.ListenAndServe(":8090", nil)

	// if the server is called, the cancelation of context depends on:
	// 1. user connection, if its closed, cancelled
	// 2. request is cancelled with http/2
	// 3. if ServeHTTP method returns
	//
	// if server responses, the cancelation of context is managed by context itself
}
