package udp

import (
	"bytes"
	"context"
	"log"
	"net"
)

// ReadUDPDataFromMoreThanOneSender shows how you could retrieve data from more than 1 connection
func ReadUDPDataFromMoreThanOneSender() {
	ctx, cancel := context.WithCancel(context.Background())
	serverAddr, err := EchoServerUDP(ctx, "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}
	defer cancel()

	client, err := net.ListenPacket("udp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}
	defer func() { _ = client.Close() }()

	interloper, err := net.ListenPacket("udp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}

	interrupt := []byte("pardon me")
	n, err := interloper.WriteTo(interrupt, client.LocalAddr())
	if err != nil {
		log.Fatal(err)
	}
	_ = interloper.Close()

	if l := len(interrupt); l != n {
		log.Fatalf("wrote %d bytes of %d", n, l)
	}

	ping := []byte("ping")
	_, err = client.WriteTo(ping, serverAddr)
	if err != nil {
		log.Fatal(err)
	}

	buf := make([]byte, 1024)
	n, addr, err := client.ReadFrom(buf)
	if err != nil {
		log.Fatal(err)
	}

	if !bytes.Equal(interrupt, buf[:n]) {
		log.Fatalf("expected reply %q; actual reply %q", interrupt, buf[:n])
	}
	if addr.String() != interloper.LocalAddr().String() {
		log.Fatalf("expected message from %q; actual sender is %q",
			interloper.LocalAddr(), addr)
	}

	n, addr, err = client.ReadFrom(buf)
	if err != nil {
		log.Fatal(err)
	}

	if !bytes.Equal(ping, buf[:n]) {
		log.Fatalf("expected reply %q; actual reply %q", ping, buf[:n])
	}
	if addr.String() != serverAddr.String() {
		log.Fatalf("expected message from %q; actual sender is %q",
			serverAddr, addr)
	}
}
