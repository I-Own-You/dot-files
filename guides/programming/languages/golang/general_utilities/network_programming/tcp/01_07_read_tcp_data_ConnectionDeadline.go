package tcp

import (
	"errors"
	"io"
	"log"
	"net"
	"time"
)

// ConnectionDeadline shows a way to set a time limit read/write connection operations
func ConnectionDeadline() {
	sync := make(chan struct{})
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

		defer func() {
			conn.Close()
			close(sync) // read from sync shouldn't block due to early return
		}()

		// 1. conn.SetDeadline() is a way to limit read/write on a connection
		// 2. if you want to limit only read or write there are methods for it like:
		//    SetReadDeadline() or SetWriteDeadline()
		err = conn.SetDeadline(time.Now().Add(5 * time.Second))
		if err != nil {
			log.Fatal(err)
			return
		}

		buf := make([]byte, 1)
		_, err = conn.Read(buf)

		if errTimeout, ok := errors.AsType[net.Error](err); !ok && !errTimeout.Timeout() {
			log.Fatalf("expected timeout error; actual: %v", err)
		}

		sync <- struct{}{}

		err = conn.SetDeadline(time.Now().Add(5 * time.Second))
		if err != nil {
			log.Fatal(err)
			return
		}

		_, err = conn.Read(buf)
		if err != nil {
			log.Fatal(err)
		}
	}()

	conn, err := net.Dial("tcp", listener.Addr().String())
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	<-sync

	// 1. conn.Write() is a method to send data from our go program
	// 2. conn.Write() writes data as much as it can but only about how much its allowed by the connection
	//    constrains like: client tcp settings, isp settings, firewall, client OS buffer capacity, .etc
	// 3. conn.Write() blocks while tries to write data
	// 4. successful conn.Write() doesnt mean data is already received by the other connection, it means the OS
	//    network stack accepted to read data into its OS buffer to send it to the other connection
	_, err = conn.Write([]byte("1"))
	if err != nil {
		log.Fatal(err)
	}

	buf := make([]byte, 1)
	_, err = conn.Read(buf)
	if errors.Is(err, io.EOF) {
		log.Fatalf("expected server termination; actual: %v", err)
	}
}
