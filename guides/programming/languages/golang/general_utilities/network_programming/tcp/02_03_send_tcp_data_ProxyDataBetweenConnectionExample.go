package tcp

import (
	"errors"
	"io"
	"log"
	"net"
	"sync"
)

// ProxyDataBetweenConnectionExample will show a prototype of how can you proxy data
func ProxyDataBetweenConnectionExample(source, destination string) error {
	connSource, err := net.Dial("tcp", source)
	if err != nil {
		return err
	}
	defer connSource.Close()

	connDestination, err := net.Dial("tcp", destination)
	if err != nil {
		return err
	}
	defer connDestination.Close()

	// 1. basically, io.Copy(dest, src) works by copying from src to dest, so in our case
	//    we create a goroutine since io.Copy() blocks until it can actually copy, in our implementation
	//    connDestination doesnt have anything and connSource writes first which is defined below in main
	//    goroutine
	go func() { _, _ = io.Copy(connSource, connDestination) }()
	// 2. now, as of our implementation connSource has data first, its copied from connSource(io.Reader) into
	//    connDestination(io.Writer)
	_, err = io.Copy(connDestination, connSource)
	return err
}

// ProxyDataBetweenConnectionRealExampleHelper is a helper which handles proxying data
// between connections
func ProxyDataBetweenConnectionRealExampleHelper(from io.Reader, to io.Writer) error {
	fromWriter, fromIsWriter := from.(io.Writer)
	toReader, toIsReader := to.(io.Reader)

	if toIsReader && fromIsWriter {
		go func() { _, _ = io.Copy(fromWriter, toReader) }()
	}

	_, err := io.Copy(to, from)
	return err
}

// ProxyDataBetweenConnectionRealExample shows a real example of handling connection between
// 2 hosts and proxying data through middle host
func ProxyDataBetweenConnectionRealExample() {
	var wg sync.WaitGroup
	// 1. server listens for a "ping" message and responds with a
	//    "pong" message. All other messages are echoed back to the client.
	server, err := net.Listen("tcp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}
	wg.Go(func() {
		for {
			conn, err := server.Accept()
			if err != nil {
				return
			}

			go func() {
				defer conn.Close()

				for {
					buf := make([]byte, 1024)
					n, err := conn.Read(buf)
					if err != nil {
						if errors.Is(err, io.EOF) {
							log.Fatal(err)
						}
						return
					}

					switch msg := string(buf[:n]); msg {
					case "ping":
						_, err = conn.Write([]byte("pong"))
					default:
						_, err = conn.Write(buf[:n])
					}
					if err != nil {
						if errors.Is(err, io.EOF) {
							log.Fatal(err)
						}
						return
					}
				}
			}()
		}
	})

	// 1. ProxyDataBetweenConnectionRealExampleHelper03_01 proxies messages from client connections to the
	// destinationServer. Replies from the destinationServer are proxied back to the clients.
	proxyServer, err := net.Listen("tcp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}

	wg.Go(func() {
		for {
			fromConn, err := proxyServer.Accept()
			if err != nil {
				return
			}

			go func() {
				defer fromConn.Close()

				to, err := net.Dial("tcp", server.Addr().String())
				if err != nil {
					log.Fatal(err)
					return
				}
				defer to.Close()

				err = ProxyDataBetweenConnectionRealExampleHelper(fromConn, to)
				if err != nil && !errors.Is(err, io.EOF) {
					log.Fatal(err)
				}
			}()
		}
	})

	conn, err := net.Dial("tcp", proxyServer.Addr().String())
	if err != nil {
		log.Fatal(err)
	}

	msgs := []struct{ Message, Reply string }{
		{"ping", "pong"},
		{"pong", "pong"},
		{"echo", "echo"},
		{"ping", "pong"},
	}
	for i, m := range msgs {
		_, err = conn.Write([]byte(m.Message))
		if err != nil {
			log.Fatal(err)
		}

		buf := make([]byte, 1024)
		n, err := conn.Read(buf)
		if err != nil {
			log.Fatal(err)
		}

		actual := string(buf[:n])
		log.Printf("%q -> proxy -> %q", m.Message, actual)

		if actual != m.Reply {
			log.Fatalf("%d: expected reply: %q; actual: %q", i, m.Reply, actual)
		}
	}
	_ = conn.Close()
	_ = proxyServer.Close()
	_ = server.Close()
}
