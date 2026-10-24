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

// DatagramEchoServer server usage of unix datagram socket
func DatagramEchoServer(ctx context.Context, network string, addr string) (net.Addr, error) {
	// 1. .Listen() or .ListenUnix() will clean the file used for unix socket, .ListenPacket() will not
	s, err := net.ListenPacket(network, addr)
	if err != nil {
		return nil, err
	}

	go func() {
		go func() {
			<-ctx.Done()
			_ = s.Close()

			// 2. this is why we need to cleanup the unix socket file manually
			if network == "unixgram" {
				_ = os.Remove(addr)
			}
		}()

		buf := make([]byte, 1024)
		for {
			n, clientAddr, err := s.ReadFrom(buf)
			if err != nil {
				return
			}

			_, err = s.WriteTo(buf[:n], clientAddr)
			if err != nil {
				return

			}
		}
	}()
	return s.LocalAddr(), nil
}

// TestEchoServerUnixDatagram shows how you can initiate a connection between 2 connection using
// unix datagram sockets
func TestEchoServerUnixDatagram() {
	dir, err := os.MkdirTemp("", "echo_unixgram")
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
	sSocket := filepath.Join(dir, fmt.Sprintf("s%d.sock", os.Getpid()))
	serverAddr, err := DatagramEchoServer(ctx, "unixgram", sSocket)
	if err != nil {
		log.Fatal(err)
	}

	err = os.Chmod(sSocket, os.ModeSocket|0622)
	if err != nil {
		log.Fatal(err)
	}

	cSocket := filepath.Join(dir, fmt.Sprintf("c%d.sock", os.Getpid()))
	client, err := net.ListenPacket("unixgram", cSocket)
	if err != nil {
		log.Fatal(err)
	}
	defer func() { _ = client.Close() }()

	err = os.Chmod(cSocket, os.ModeSocket|0622)
	if err != nil {
		log.Fatal(err)
	}

	msg := []byte("ping")
	for range 3 { // write 3 "ping" messages
		_, err = client.WriteTo(msg, serverAddr)
		if err != nil {
			log.Fatal(err)
		}
	}

	buf := make([]byte, 1024)
	for range 3 { // read 3 "ping" messages
		n, addr, err := client.ReadFrom(buf)
		if err != nil {
			log.Fatal(err)
		}

		if addr.String() != serverAddr.String() {
			log.Fatalf("received reply from %q instead of %q",
				addr, serverAddr)
		}
		if !bytes.Equal(msg, buf[:n]) {
			log.Fatalf("expected reply %q; actual reply %q", msg,
				buf[:n])
		}
	}
}
