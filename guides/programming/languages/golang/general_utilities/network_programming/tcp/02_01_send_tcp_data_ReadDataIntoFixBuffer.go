package tcp

import (
	"crypto/rand"
	"errors"
	"io"
	"log"
	"net"
)

// ReadDataIntoFixBuffer shows an example do read/write interaction between connections
func ReadDataIntoFixBuffer() {
	payload := make([]byte, 1<<24) // 16 MB
	// 1. .Read() basically a helper to fill with random byte data
	_, err := rand.Read(payload)
	if err != nil {
		log.Fatal(err)
	}

	listener, err := net.Listen("tcp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}

	go func() {
		conn, err := listener.Accept()
		if err != nil {
			log.Print(err)
			return
		}
		defer conn.Close()

		_, err = conn.Write(payload)
		if err != nil {
			log.Fatal(err)
		}
	}()

	conn, err := net.Dial("tcp", listener.Addr().String())
	if err != nil {
		log.Fatal(err)
	}

	buf := make([]byte, 31<<19) // 512 KB

	for {
		n, err := conn.Read(buf)
		if err != nil {
			if errors.Is(err, io.EOF) {
				log.Fatal(err)
			}
			break
		}
		log.Printf("read %d bytes", n) // buf[:n] is the data read from conn
	}
	conn.Close()
}
