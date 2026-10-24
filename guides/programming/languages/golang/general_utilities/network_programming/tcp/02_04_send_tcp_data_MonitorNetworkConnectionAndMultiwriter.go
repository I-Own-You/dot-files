package tcp

import (
	"errors"
	"io"
	"log"
	"net"
	"os"
)

// Monitor embeds a log.Logger meant for logging network traffic.
type Monitor struct {
	*log.Logger
}

// Write implements the io.Writer interface.
func (m *Monitor) Write(p []byte) (int, error) {
	// 1. here is a problem though, if you get an error for Monitor writer and its in front,
	//    further writers wont start to receive any data.
	return len(p), m.Output(2, string(p))
	// 2. a better approach would be to log the error if there is some and return nil for error instead
	// err := m.Output(2, string(p))
	// if err != nil {
	//     log.Println(err) // use the log package’s default Logger
	// }
	// return len(p), nil
}

// MonitorNetworkConnection shows how can you write to more than 1 connection at a time
func MonitorNetworkConnection() {
	// 1. the point of this Monitor is to write to stdout info from connection
	monitor := &Monitor{Logger: log.New(os.Stdout, "monitor: ", 0)}
	listener, err := net.Listen("tcp", "127.0.0.1:")
	if err != nil {
		monitor.Fatal(err)
	}

	done := make(chan struct{})
	go func() {
		defer close(done)

		conn, err := listener.Accept()
		if err != nil {
			return
		}
		defer conn.Close()

		b := make([]byte, 1024)
		// 1. io.TeeReader(reader, writer) is a helper where it reads from reader and writes to writer,
		//    there is also no internal buffering which means io.TeeReader() doesnt hold the bytes written,
		//    and the w.Write() returns earlier then r.Read() but w.Write() finished doesnt mean the data
		//    arrived at the OS buffer yet(it could or not yet)
		// 1.1 but here no actions are produced yet
		r := io.TeeReader(conn, monitor)
		// 2. here is where actions are done, r.Read(b) is the action where the connection passed to
		//    io.TeeReader(r, w) reads data and writes to writer in our case monitor
		n, err := r.Read(b)
		if err != nil && errors.Is(err, io.EOF) {
			monitor.Println(err)
			return
		}

		// 3. io.MultiWriter(writers ...io.Writer) returns a multiwriter structs, basically means
		//    a slice of writers into which you can write data in order, any error will stop further,
		w := io.MultiWriter(conn, monitor)
		// 4. here is when the writers will start the process of receiving data
		_, err = w.Write(b[:n])
		if err != nil && errors.Is(err, io.EOF) {
			monitor.Println(err)
			return
		}
	}()

	conn, err := net.Dial("tcp", listener.Addr().String())
	if err != nil {
		monitor.Fatal(err)
	}

	_, err = conn.Write([]byte("Test\n"))
	if err != nil {
		monitor.Fatal(err)
	}

	_ = conn.Close()
	<-done
}
