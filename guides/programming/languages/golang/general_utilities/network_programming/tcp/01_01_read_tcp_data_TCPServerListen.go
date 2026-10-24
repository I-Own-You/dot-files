package tcp

import (
	"log"
	"net"
)

// TCPServerListen listens on a socket through "tcp"
func TCPServerListen() error {
	// 1. "tcp" is a network type
	//
	// 2. "127.0.0.1" is an IP
	// 2.1 ":0", 0 is a port so ip + port = socket
	// 2.3 if you leave port empty, OS will use a random one
	// 2.4 if you leave ip empty, OS will bind all anycast/unicast IPs on the system
	// 2.5 both ip+port empty so like "" or ":" will cause a random port + all anycast/unicast IPs used
	//
	// 3. if OS successfully assigns this socket to our program, it means the "bounding" is successful,
	//	  and we get a listener that can accept incoming connection that you can accept/reject/.etc
	// 3.1 no other program can listen on this socket
	//
	// 4. you can also get an error which has different types of errors meaning someting is not ok
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		log.Fatal(err)
	}
	// 1. you should always close listener because it uses resources which could potentially be free
	//    for something else, (if you need it to be alive, dont close it)
	defer func() { _ = listener.Close() }()

	// 1. typically incoming connections from other networks are accepted in a for loop so that you can
	//    accept more than 1 connection.
	// 2. .Accept() method blocks until it accepts a connection and "handshake" between client/server is done
	// 3. also, this process is usually done inside a goroutine
	// 4. if listener successfully accepted a connection you received a connection object which can be used,
	//    to talk to the other end (in our case we are the server since we handle the logic for incoming
	//	  connections which means we can read/write from the other end connection being on server)
	// 5. "conn" object under the hood is actually a pointer to "net.TCPConn" because we accept "tcp"
	//	  connections but on the surface its an interface "Conn"(this interface provides enough to handle
	// 	  typical cases), and yes it can be other things depending on the network type you listen on
	for {
		conn, err := listener.Accept()
		if err != nil {
			return err
		}
		// 1. you typically hande connection logic inside a goroutine
		go func(c net.Conn) {
			// 2. you should always close a connection since it uses resources and you actually
			//    want to free it if system doesnt need it anymore (drain the bytes from the wire,
			//    so that TCP connections can be reused, .etc)
			defer c.Close()
			// Your code would handle the connection here.
		}(conn)
	}
}
