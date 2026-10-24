package udp

import (
	"context"
	"fmt"
	"net"
)

// EchoServerUDP is an example of udp server
func EchoServerUDP(ctx context.Context, addr string) (net.Addr, error) {
	// 1. in terms of connections for UDP you cant use .Listen(), but you can use .ListenPacket() or
	//    others that work with UDP
	s, err := net.ListenPacket("udp", addr)
	if err != nil {
		return nil, fmt.Errorf("binding to udp %s: %w", addr, err)
	}

	go func() {
		go func() {
			<-ctx.Done()
			_ = s.Close()
		}()

		buf := make([]byte, 1024)
		for {
			// 1. .ReadFrom() is for udp instead of .Read() for tcp
			// 2. you also get the other connection address since UDP doesnt maintain the address of it
			//    through an opened connction as tcp does with conn := listener.Accept()
			n, clientAddr, err := s.ReadFrom(buf) // client to server
			if err != nil {
				return
			}

			// 2. since udp doesnt maintain a connection with the client as tcp does, you shuld
			//    incude the other connection address when you send data to it
			_, err = s.WriteTo(buf[:n], clientAddr) // server to client
			if err != nil {
				return
			}
		}
	}()

	return s.LocalAddr(), nil
}

