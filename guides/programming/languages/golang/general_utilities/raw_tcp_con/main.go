package main

import (
	"fmt"
	"net"
	"time"
)

// example of a raw connection over a TCP socket.

func main() {
	go serverTCP()

	// this is needed for the synchronization so the server will have time to start
	// but if this would be called from different soruces, the server would anyway need to be first.
	time.Sleep(time.Second)

	go clientTCP()
	select {}
}

func clientTCP() {
	// The client resolves "127.0.0.1:3000" to a *net.TCPAddr.
	// this address represents localhost on port 3000 for TCP connections.
	//
	// This function converts a string-based IP address and port (like "127.0.0.1:3000")
	// into a *net.TCPAddr structure that Go can work with.
	//
	// parameters:
	//   network: specifies the protocol type ("tcp", "tcp4", or "tcp6").
	//           "tcp" will let Go choose either IPv4 or IPv6 based on what is available.
	//   address: a string with an IP address and port ("IP:Port"), or just a port if connecting on localhost.
	//
	// return: A *net.TCPAddr object containing IP, port, and zone (for IPv6) information.
	//         this is used by other networking functions like DialTCP or ListenTCP.
	//
	// example: resolving "127.0.0.1:3000" will give a *net.TCPAddr with IP 127.0.0.1 and port 3000.
	tcpAddr, err := net.ResolveTCPAddr("tcp", "127.0.0.1:3000")
	if err != nil {
		fmt.Println("client 1")
	}

	// The client tries to connect to the server at the specified tcpAddr.
	// nil for the second argument means the client will automatically assign a local address.
	//
	// DialTCP initiates a TCP connection to the specified server address.
	//
	// parameters:
	//   network: Specifies the protocol type ("tcp", "tcp4", "tcp6").
	//   localAddr: Specifies the local address the client should use to make the connection.
	//              Setting it to nil allows the OS to automatically pick an available local address.
	//   remoteAddr: A *net.TCPAddr pointing to the server’s address (obtained via ResolveTCPAddr).
	//
	// return: *net.TCPConn object representing the connection to the server.
	//         This object is used to send and receive data with Write and Read methods.
	conn, err := net.DialTCP("tcp", nil, tcpAddr)
	if err != nil {
		fmt.Println("client 2")
	}

	// writes data to the server
	_, err = conn.Write([]byte("hello from client"))
	if err != nil {
		fmt.Println("client 3")
	}

	var buf [512]byte
	// reads data from the server, doesnt print or anything else, just reads and puts into buf
	_, err = conn.Read(buf[:])
	if err != nil {
		fmt.Println("client 4")
	}

	fmt.Printf("client receive: %s\n", buf)
}

func serverTCP() {
	// The client resolves "127.0.0.1:3000" to a *net.TCPAddr.
	// This address represents localhost on port 3000 for TCP connections.
	tcpAddr, err := net.ResolveTCPAddr("tcp", "127.0.0.1:3000")
	if err != nil {
		fmt.Println("server 1")
	}

	// the server starts listening for incoming TCP connections on tcpAddr.
	//
	// ListenTCP sets up a TCP server that listens for incoming connections on the specified local address.
	//
	// parameters:
	//   network: The network protocol ("tcp", "tcp4", "tcp6").
	//   localAddr: A *net.TCPAddr representing the address and port the server listens on.
	//
	// return: A *net.TCPListener object, which allows the server to accept incoming connections.
	//         it continuously listens until explicitly stopped.
	listener, err := net.ListenTCP("tcp", tcpAddr)
	if err != nil {
		fmt.Println("server 2")
	}

	// the server waits for a client to connect.
	// when a client connects, it accepts the connection and assigns it to conn.
	//
	// Purpose: Accepts the next incoming connection from the client.
	//          When a client initiates a connection with DialTCP,
	//          this function will return a connection (conn) to the server.
	//
	// return: A net.Conn representing the client’s connection.
	//         Through this conn object, the server can communicate with the client, reading and writing data.
	//
	// Accept is typically used in a loop so that the server can handle multiple connections.
	// Each call to Accept waits until a client connects or an error occurs.
	conn, err := listener.Accept()
	if err != nil {
		fmt.Println("server 3")
	}

	// sends data to the client.
	if _, err = conn.Write([]byte("hello from server")); err != nil {
		fmt.Println("server 4")
	}

	buf := make([]byte, 512)
	// reads data fromt the client
	_, err = conn.Read(buf[:])
	if err != nil {
		fmt.Println("server 5")
	}

	fmt.Printf("server receive: %s\n", buf)

}
