package tcp

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net"
	"time"
)

const defaultPingInterval = 30 * time.Second

// HeartBeatPinger util func for HeartBeat implementation
func HeartBeatPinger(ctx context.Context, w io.Writer, reset <-chan time.Duration) {
	var interval time.Duration

	select {
	case <-ctx.Done():
		return
	case interval = <-reset: // pulled initial interval off reset channel
	default:
	}

	if interval <= 0 {
		interval = defaultPingInterval
	}

	timer := time.NewTimer(interval)
	defer timer.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case newInterval := <-reset:
			timer.Stop()

			if newInterval > 0 {
				interval = newInterval
			}
		case <-timer.C:
			if _, err := w.Write([]byte("ping")); err != nil {
				// track and act on consecutive timeouts here
				return
			}
		}
		_ = timer.Reset(interval)
	}
}

// HeartBeatExamplePinger util func for HeartBeat implementation
func HeartBeatExamplePinger() {
	ctx, cancel := context.WithCancel(context.Background())
	r, w := io.Pipe() // in lieu of net.Conn
	done := make(chan struct{})
	resetTimer := make(chan time.Duration, 1)
	resetTimer <- time.Second // initial ping interval

	go func() {
		HeartBeatPinger(ctx, w, resetTimer)
		close(done)
	}()

	receivePing := func(d time.Duration, r io.Reader) {
		if d >= 0 {
			fmt.Printf("resetting timer (%s)\n", d)
			resetTimer <- d
		}
		now := time.Now()
		buf := make([]byte, 1024)
		n, err := r.Read(buf)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Printf("received %q (%s)\n",
			buf[:n], time.Since(now).Round(100*time.Millisecond))
	}
	for i, v := range []int64{0, 200, 300, 0, -1, -1, -1} {
		fmt.Printf("Run %d:\n", i+1)
		receivePing(time.Duration(v)*time.Millisecond, r)
	}
	cancel()
	<-done // ensures the pinger exits after canceling the context
}

// ProlongDeadlineUsingHeartBeat shows how to extend/revive deadlines using heartbeat technique
func ProlongDeadlineUsingHeartBeat() {
	done := make(chan struct{})
	listener, err := net.Listen("tcp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}

	begin := time.Now()

	go func() {
		defer func() { close(done) }()

		conn, err := listener.Accept()
		if err != nil {
			log.Print(err)
			return
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer func() {
			cancel()
			conn.Close()
		}()

		resetTimer := make(chan time.Duration, 1)
		resetTimer <- time.Second

		go HeartBeatPinger(ctx, conn, resetTimer)

		err = conn.SetDeadline(time.Now().Add(15 * time.Second))
		if err != nil {
			log.Fatal(err)
			return
		}

		buf := make([]byte, 1024)

		for {
			n, err := conn.Read(buf)
			if err != nil {
				return
			}

			log.Printf("[%s] %s", time.Since(begin).Truncate(time.Second), buf[:n])

			resetTimer <- 0

			err = conn.SetDeadline(time.Now().Add(5 * time.Second))
			if err != nil {
				log.Fatal(err)
				return
			}
		}
	}()
	conn, err := net.Dial("tcp", listener.Addr().String())
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	buf := make([]byte, 1024)

	for range 4 { // read up to four pings
		n, err := conn.Read(buf)
		if err != nil {
			log.Fatal(err)
		}

		log.Printf("[%s] %s", time.Since(begin).Truncate(time.Second), buf[:n])
	}

	_, err = conn.Write([]byte("PONG!!!")) // should reset the ping timer
	if err != nil {
		log.Fatal(err)
	}

	for range 4 { // read up to four more pings
		n, err := conn.Read(buf)
		if err != nil {
			if errors.Is(err, io.EOF) {
				log.Fatal(err)
			}
			break
		}
		log.Printf("[%s] %s", time.Since(begin).Truncate(time.Second), buf[:n])
	}

	<-done

	end := time.Since(begin).Truncate(time.Second)
	log.Printf("[%s] done", end)

	if end != 9*time.Second {
		log.Fatalf("expected EOF at 9 seconds; actual %s", end)
	}
}
