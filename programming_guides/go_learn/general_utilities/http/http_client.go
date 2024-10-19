package main

import (
	"bufio"
	"fmt"
	"net/http"
)

// go has builtin support for http clients and servers in net/http pkg

func HttpClient() {

	// issue an HTTP GET request to a server.
	// http.Get is a convenient shortcut around creating an http.Client object and calling its Get method,
	// it uses the http.DefaultClient object which has useful default settings.
	resp, err := http.Get("https://gobyexample.com")
	if err != nil {
		panic(err)
	}
	// also make sure to close the response,
	// because the response holds a connection to the remote server and consumes,
	// system resources(memory buffers, file descriptors).
	//
	// if you dont close the body, resources are not dropped, this could lead
	// into many open files or conections or perfomrance issues.
	defer resp.Body.Close()

	// response status print
	fmt.Println("Response status:", resp.Status)

	// printing first 5 line from a response body
	scanner := bufio.NewScanner(resp.Body)
	for i := 0; scanner.Scan() && i < 5; i++ {
		fmt.Println(scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}

	// in go, http connections are pooled and reused (via http keep-alive).
	//
	// if you don’t close the response body,
	// the connection might not be properly returned to the pool for reuse,
	// resulting in performance issues or even connection exhaustion.
}
