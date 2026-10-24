package tcp

import (
	"context"
	"log"
	"net"
	"sync"
	"time"
)

// CancelMultipleDialersWithContext shows how to cancel multiple dialers with context
func CancelMultipleDialersWithContext() {
	ctx, cancel := context.WithDeadline(context.Background(), time.Now().Add(10*time.Second))
	listener, err := net.Listen("tcp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}

	defer listener.Close()

	go func() {
		// 1. only accepting a single connection.
		conn, err := listener.Accept()
		if err == nil {
			conn.Close()
		}
	}()

	dial := func(ctx context.Context, address string, response chan int, id int) {
		var d net.Dialer
		c, err := d.DialContext(ctx, "tcp", address)
		if err != nil {
			return
		}

		c.Close()

		select {
		// 1. after the first accepted connection from the server all the other connections will
		//    have the first case
		case <-ctx.Done():
		// 2. this will fire only for the first accepted connection since we close the channel
		//    right after it
		case response <- id:
		}
	}

	res := make(chan int)
	var wg sync.WaitGroup

	for i := range 10 {
		wg.Go(func() { dial(ctx, listener.Addr().String(), res, i+1) })
	}

	// 1. we send dat to channel where the first connection will get it
	response := <-res

	// 2. we cancel the context so that other dialers will fire the case with ctx.Done instead
	cancel()

	// 3. we wait for all dialers
	wg.Wait()

	// 4. we close the chanells for dialers since they still receive data so they cannot send to it
	close(res)

	if ctx.Err() != context.Canceled {
		log.Fatalf("expected canceled context; actual: %s",
			ctx.Err(),
		)
	}

	log.Printf("dialer %d retrieved the resource", response)
}
