package main

import (
	"fmt"
	"net"
	"time"
)

// example of a raw connection over a TCP socket with UDP,
// the main point is that the server no longer listens and accept connections,
// it just waits for data, (datagrams).

// UDP is connectionless and operates on datagrams,
// meaning that each side waits for data to arrive,
// but doesn’t actually establish a reliable “handshake” like TCP.
// so, the client and server need to follow a strict order in sending and receiving data,
// unlike tcp where write/read can be in any order.

func main() {
	go serverUDP()

	// this is needed for the synchronization so the server will have time to start
	// but if this would be called from different soruces, the server would anyway need to be first.
	time.Sleep(time.Second * 1)

	go clientUDP()
	select {}
}

func clientUDP() {
	// The client resolves "127.0.0.1:3000" to a *net.UDPAddr.
	// this address represents localhost on port 3000 for UDP connections.
	//
	// This function converts a string-based IP address and port (like "127.0.0.1:3000")
	// into a *net.UDPAddr structure that Go can work with.
	//
	// parameters:
	//   network: specifies the protocol type ("upd", "udp4", or "udp6").
	//           "tcp" will let Go choose either IPv4 or IPv6 based on what is available.
	//   address: a string with an IP address and port ("IP:Port"), or just a port if connecting on localhost.
	//
	// return: A *net.UDPAddr object containing IP, port, and zone (for IPv6) information.
	//         this is used by other networking functions like DialTCP or ListenTCP.
	//
	// example: resolving "127.0.0.1:3000" will give a *net.UDPAddr with IP 127.0.0.1 and port 3000.
	raddr, err := net.ResolveUDPAddr("udp", "127.0.0.1:3000")
	if err != nil {
		fmt.Println("client 1")
	}

	// The client tries to connect to the server at the specified raddr.
	// nil for the second argument means the client will automatically assign a local address.
	//
	// DialUDP initiates a UDP connection to the specified server address.
	//
	// parameters:
	//   network: Specifies the protocol type ("udp", "udp4", "udp6").
	//   localAddr: Specifies the local address the client should use to make the connection.
	//              Setting it to nil allows the OS to automatically pick an available local address.
	//   remoteAddr: A *net.UDPAddr pointing to the server’s address (obtained via ResolveUDPAddr).
	//
	// return: *net.UDPConn object representing the connection to the server.
	//         This object is used to send and receive data with Write and Read methods.
	conn, err := net.DialUDP("udp", nil, raddr)
	if err != nil {
		fmt.Println("client 2")
	}

	var buf [512]byte
	// writes data to the server
	_, err = conn.Write([]byte("hello from client"))
	if err != nil {
		fmt.Println("client 4")
	}

	// reads data from the server, doesnt print or anything else, just reads and puts into buf
	_, err = conn.Read(buf[:])
	if err != nil {
		fmt.Println("client 3")
	}

	fmt.Printf("client receive: %s\n", buf)
}

func serverUDP() {
	// The client resolves "127.0.0.1:3000" to a *net.UDPAddr.
	// This address represents localhost on port 3000 for UDP connections.
	udpAddr, err := net.ResolveUDPAddr("udp", "127.0.0.1:3000")
	if err != nil {
		fmt.Println("server 1")
	}

	// so it just listens for incomming connections/data, no need to for approval(listener.accept)
	conn, err := net.ListenUDP("udp", udpAddr)
	if err != nil {
		fmt.Println("server 2")
	}

	buf := make([]byte, 512)
	// readFromUDP reads data and also captures the client’s address (IP and port),
	// which is crucial for knowing where to send responses since its a udp *communication*,
	// and server isnt connected to client.
	_, connAddr, err := conn.ReadFromUDP(buf[:])
	if err != nil {
		fmt.Println("server 3")
	}

	fmt.Printf("server receive: %s\n", buf)

	// WriteToUDP allows the server to specify the exact client address to send the response to,
	// which is needed because there is no dedicated connection between server and client,
	// as it was in TCP style.
	if _, err := conn.WriteToUDP([]byte("hello from server"), connAddr); err != nil {
		fmt.Println("server 4")
	}

}
