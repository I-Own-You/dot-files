package unix

import (
	"bytes"
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"path/filepath"
)

// StreamingEchoServer shows a usage of unix streaming socket type
func StreamingEchoServer(ctx context.Context, network string, addr string) (net.Addr, error) {
	s, err := net.Listen(network, addr)
	if err != nil {
		return nil, err
	}

	go func() {
		go func() {
			<-ctx.Done()
			_ = s.Close()
		}()

		for {
			conn, err := s.Accept()
			if err != nil {
				return
			}

			go func() {
				defer func() { _ = conn.Close() }()

				for {
					buf := make([]byte, 1024)
					n, err := conn.Read(buf)
					if err != nil {
						return
					}

					_, err = conn.Write(buf[:n])
					if err != nil {
						return
					}
				}
			}()
		}
	}()
	return s.Addr(), nil
}

// TestEchoServerUnix uses the StreamingEchoServer server to start unix communcation between 2 connections
func TestEchoServerUnix() {
	dir, err := os.MkdirTemp("", "echo_unix")
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if rErr := os.RemoveAll(dir); rErr != nil {
			log.Fatal(rErr)
		}
	}()

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	socket := filepath.Join(dir, fmt.Sprintf("%d.sock", os.Getpid()))
	rAddr, err := StreamingEchoServer(ctx, "unix", socket)
	if err != nil {
		log.Fatal(err)
	}

	err = os.Chmod(socket, os.ModeSocket|0666)
	if err != nil {
		log.Fatal(err)
	}

	conn, err := net.Dial("unix", rAddr.String())
	if err != nil {
		log.Fatal(err)
	}
	defer func() { _ = conn.Close() }()

	msg := []byte("ping")
	for range 3 { // write 3 "ping" messages
		_, err = conn.Write(msg)
		if err != nil {
			log.Fatal(err)
		}
	}

	buf := make([]byte, 1024)
	n, err := conn.Read(buf) // read once from the server
	if err != nil {
		log.Fatal(err)
	}

	expected := bytes.Repeat(msg, 3)
	if !bytes.Equal(expected, buf[:n]) {
		log.Fatalf("expected reply %q; actual reply %q", expected,
			buf[:n])
	}
}
