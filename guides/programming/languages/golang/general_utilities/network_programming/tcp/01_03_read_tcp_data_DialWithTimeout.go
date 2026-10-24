package tcp

import (
	"errors"
	"log"
	"net"
	"time"
)

// DialWithTimeout shows a timeout dial example using timeout
func DialWithTimeout() {
	// 1. "net" has a lot of methods that suits many cases, one case is to try to establish a
	//	  connection spending no longer than N amount of time
	c, err := net.DialTimeout("tcp", "10.0.0.1:http", 3*time.Second)
	if err == nil {
		c.Close()
		log.Fatal("connection did not time out")
	}

	var nErr net.Error
	if !errors.As(err, &nErr) {
		log.Fatal(err)
	}
	// 1. if the error was a timeout, we log it
	if !nErr.Timeout() {
		log.Fatal("error is not a timeout")
	}
}
