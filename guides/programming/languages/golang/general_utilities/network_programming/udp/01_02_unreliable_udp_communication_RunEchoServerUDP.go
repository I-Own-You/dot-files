package udp

import (
	"bytes"
	"context"
	"log"
	"net"
)

// RunEchoServerUDP shows how can you run and use an UDP echo server
func RunEchoServerUDP() {
	ctx, cancel := context.WithCancel(context.Background())
	serverAddr, err := EchoServerUDP(ctx, "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}
	defer cancel()

	// 1. yes, client can also use .ListenPacket() unlike with "tcp" where client can use .Dial() but not,
	//    it works because .ListenPacket() can both read/write right ahead while .Listen() only accepts
	//    connections
	client, err := net.ListenPacket("udp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}
	defer func() { _ = client.Close() }()

	msg := []byte("ping")
	// 1. .WriteTo() is the same as .Write() for "tcp"
	// 2. client still needs to put the other connection address since its "udp" connection, not "tcp"
	_, err = client.WriteTo(msg, serverAddr)
	if err != nil {
		log.Fatal(err)
	}

	buf := make([]byte, 1024)
	n, addr, err := client.ReadFrom(buf)
	if err != nil {
		log.Fatal(err)
	}

	if addr.String() != serverAddr.String() {
		log.Fatalf("received reply from %q instead of %q", addr, serverAddr)
	}

	if !bytes.Equal(msg, buf[:n]) {
		log.Fatalf("expected reply %q; actual reply %q", msg, buf[:n])
	}
}
