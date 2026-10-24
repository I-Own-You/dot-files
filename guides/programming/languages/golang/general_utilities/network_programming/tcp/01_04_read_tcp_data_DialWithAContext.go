package tcp

import (
	"context"
	"errors"
	"log"
	"net"
	"syscall"
	"time"
)

// DialWithAContext shows an example to timeout a connection using context
func DialWithAContext() {
	dl := time.Now().Add(5 * time.Second)
	ctx, cancel := context.WithDeadline(context.Background(), dl)
	defer cancel()

	var d net.Dialer // DialContext is a method on a Dialer
	// 1. control helps do some action after creating a network connection but before dialing it
	d.Control = func(_, _ string, _ syscall.RawConn) error {
		// 2. sleep long enough to reach the context's deadline.
		time.Sleep(5*time.Second + time.Millisecond)
		return nil
	}

	// 1. "net" package has also a method that let us control a dialing duration using a context
	conn, err := d.DialContext(ctx, "tcp", "10.0.0.0:80")
	if err == nil {
		conn.Close()
		log.Fatal("connection did not time out")
	}

	// 1. we check if we got not a timeout error
	if nErr, ok := errors.AsType[net.Error](err); !ok {
		log.Fatal(err)
	} else {
		if !nErr.Timeout() {
			log.Fatalf("error is not a timeout: %v", err)
		}
	}

	// 1. check if our error is indeed a context one
	if ctx.Err() != context.DeadlineExceeded {
		log.Fatalf("expected deadline exceeded; actual: %v", ctx.Err())
	}
}
