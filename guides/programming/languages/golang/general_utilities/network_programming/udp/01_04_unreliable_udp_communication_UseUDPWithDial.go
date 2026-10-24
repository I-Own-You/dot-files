package udp

import (
	"bytes"
	"context"
	"log"
	"net"
	"time"
)

// UseUDPWithDial shows how can you use .Dial() for UDP
func UseUDPWithDial() {
	ctx, cancel := context.WithCancel(context.Background())
	serverAddr, err := EchoServerUDP(ctx, "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}
	defer cancel()

	// 1. .Dial() can also be used with "udp", the point here is that now you maintain a connection with
	//    another connection by using "udp" protocol, now you dont need to put the address when you write,
	//    the client object here is "net.Conn" as with "tcp", its a generic interface which abstracts
	//    the overhead of using different network types
	client, err := net.Dial("udp", serverAddr.String())
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
	// 1. as you see, you can write right ahead data without putting the address of the other connection,
	//    since we maintain the connection through .Dial()
	_, err = client.Write(ping)
	if err != nil {
		log.Fatal(err)
	}

	buf := make([]byte, 1024)
	n, err = client.Read(buf)
	if err != nil {
		log.Fatal(err)
	}

	if !bytes.Equal(ping, buf[:n]) {
		log.Fatalf("expected reply %q; actual reply %q", ping, buf[:n])
	}

	err = client.SetDeadline(time.Now().Add(time.Second))
	if err != nil {
		log.Fatal(err)
	}

	_, err = client.Read(buf)
	if err == nil {
		log.Fatal("unexpected packet")
	}
}
