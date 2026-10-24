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

// TestEchoServerUnixPacket shows how can u use unix packet sequnce (but its legacy nowadays),
// the points is that this unix connection type discards unrequested data, you receive 50, but need 30,
// OS discard 20.
func TestEchoServerUnixPacket() {
	dir, err := os.MkdirTemp("", "echo_unixpacket")
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if rErr := os.RemoveAll(dir); rErr != nil {
			log.Fatal(rErr)
		}
	}()

	ctx, cancel := context.WithCancel(context.Background())
	socket := filepath.Join(dir, fmt.Sprintf("%d.sock", os.Getpid()))
	rAddr, err := StreamingEchoServer(ctx, "unixpacket", socket)
	if err != nil {
		log.Fatal(err)
	}
	defer cancel()

	err = os.Chmod(socket, os.ModeSocket|0666)
	if err != nil {
		log.Fatal(err)
	}

	conn, err := net.Dial("unixpacket", rAddr.String())
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
	for range 3 { // read 3 times from the server
		n, err := conn.Read(buf)
		if err != nil {
			log.Fatal(err)
		}

		if !bytes.Equal(msg, buf[:n]) {
			log.Fatalf("expected reply %q; actual reply %q", msg, buf[:n])
		}
	}

	for range 3 { // write 3 more "ping" messages
		_, err = conn.Write(msg)
		if err != nil {
			log.Fatal(err)
		}
	}

	buf = make([]byte, 2)
	// only read the first 2 bytes of each reply
	for range 3 { // read 3 times from the server
		n, err := conn.Read(buf)
		if err != nil {
			log.Fatal(err)
		}

		if !bytes.Equal(msg[:2], buf[:n]) {
			log.Fatalf("expected reply %q; actual reply %q", msg[:2], buf[:n])
		}
	}
}
