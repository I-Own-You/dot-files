package tcp

import (
	"log"
	"net"
)

// GoTCPConnObjectDetails shows some details of underlying connection details by using TCPConn object
func GoTCPConnObjectDetails() {
	// 1. TCPConn is a handy object that can help with more low level settings of network stack by accessing
	//    its fields/methods
	// 2. easiest way to acquire a TCPConn is by an interface assertion
	// 3. there is also ListenTCP and DialTCP, .etc that can give you a TCPConn but since
	//    .Listen, .Dial are generic, under the hood you can acquire the data based on network type "tcp"
	// conn, err := conn.(*net.TCPConn)

	// 1. net.ResolveTCPAddr() is a handy way to check if the address is valid and you also get a
	//    *net.TCPAddr object with handy fields
	serverAddr, err := net.ResolveTCPAddr("tcp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}
	// 2. on the server you usually do this to acquire the TCPConn object
	listener, err := net.ListenTCP("tcp", serverAddr)
	if err != nil {
		log.Fatal(err)
	}
	defer listener.Close()

	go func() {
		serverTCPConn, err := listener.AcceptTCP()
		if err != nil {
			log.Fatal(err)
		}
		defer serverTCPConn.Close()
	}()

	clientAddr, err := net.ResolveTCPAddr("tcp", "www.google.com:http")
	if err != nil {
		log.Fatal(err)
	}
	// 1. on the client you would typically use .DialTcp() to acquire TCPConn
	clientTCPConn, err := net.DialTCP("tcp", nil, clientAddr)
	if err != nil {
		log.Fatal(err)
	}
	defer clientTCPConn.Close()
}
