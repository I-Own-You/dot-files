package tcp

import (
	"errors"
	"io"
	"log"
	"net"
)

// ClientConnectToServer shows a connection from clinet to server
func ClientConnectToServer() {
	listener, err := net.Listen("tcp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}

	done := make(chan struct{})

	go func() {
		defer func() { done <- struct{}{} }()

		for {
			conn, err := listener.Accept()
			if err != nil {
				log.Print(err)
				return
			}

			go func(c net.Conn) {
				defer func() {
					c.Close()
					done <- struct{}{}
				}()

				// 1. buf will act as a place were packets of data(bytes) will be stored when server
				//    will try to read from client with c.Read(buf)
				buf := make([]byte, 1024)
				for {
					// 1. c.Read() blocks the execution until OS tells go process that inside OS buffer
					//    it received data which is ready to be read
					// 2. c.Read() doesnt read <= len(buf) which means it reads as much as it can from the OS
					//	  buffer at the moment, so it means OS buffer can have less than len(buf) but not more,
					//    but it depends on the network type, in our case "tcp" works like this
					// 3. "n" is the number of bytes read
					n, err := c.Read(buf)
					if err != nil {
						if errors.Is(err, io.EOF) {
							log.Fatal(err)
						}
						return
					}
					log.Printf("received: %q", buf[:n])
				}
			}(conn)
		}
	}()

	// 1. net.Dial() is the same as net.Listen in that it accepts the same arguments and tries to
	//    connect to the socket and thats it, it doesnt listen, its not a "server"
	// 2. "listener" object received has methods we can use, in our case we retrieve the address of
	//    the server we want to make a connection to
	// 3. both .Listen/Dial can use a hostname, if a hostname resolves to more than 1 IP, it will try
	//    to connect to multiple and see which one responds and dropping the other ones, both IP and PORT
	//    can use a name, "google.com:https"
	// 4. if you use a ipv6 you must wrap it inside [ ] since ipv6 uses colons for itself: "[2001:ed27::1]:https"
	conn, err := net.Dial("tcp", listener.Addr().String())
	if err != nil {
		log.Fatal(err)
	}

	conn.Close()
	<-done
	listener.Close()
	<-done
}
