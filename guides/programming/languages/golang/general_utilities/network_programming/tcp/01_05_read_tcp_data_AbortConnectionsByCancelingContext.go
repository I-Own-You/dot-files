package tcp

import (
	"context"
	"log"
	"net"
	"syscall"
	"time"
)

// AbortConnectionsByCancelContext shows a way to abort a connect by canceling the context
func AbortConnectionsByCancelContext() {
	ctx, cancel := context.WithCancel(context.Background())
	sync := make(chan struct{})

	go func() {
		defer func() { sync <- struct{}{} }()

		var d net.Dialer
		d.Control = func(_, _ string, _ syscall.RawConn) error {
			time.Sleep(time.Second)
			return nil
		}
		conn, err := d.DialContext(ctx, "tcp", "10.0.0.1:80")
		if err != nil {
			log.Print(err)
			return
		}
		conn.Close()
		log.Fatal("connection did not time out")
	}()

	// 1. now, we dont wait for the time to pass, we cancel if explicitly
	cancel()
	<-sync

	if ctx.Err() != context.Canceled {
		log.Fatalf("expected canceled context; actual: %q", ctx.Err())
	}
}
