package tcp

import (
	"bufio"
	"log"
	"net"
	"slices"
)

const payload = "The bigger the interface, the weaker the abstraction."

// ReadDataIntoFixBufferUsingScanner shows read/write between connection using scanner from
// "bufio" package which allows to receive data through word,lines,.etc so it depends on scanner possibilities
func ReadDataIntoFixBufferUsingScanner() {
	listener, err := net.Listen("tcp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}

	go func() {
		conn, err := listener.Accept()
		if err != nil {
			log.Fatal(err)
			return
		}
		defer conn.Close()

		_, err = conn.Write([]byte(payload))
		if err != nil {
			log.Fatal(err)
		}
	}()

	conn, err := net.Dial("tcp", listener.Addr().String())
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	// 1. we create a new scanner from connection, it works because conn object implements
	//    io.Reader interface
	scanner := bufio.NewScanner(conn)
	// 2. by default, scanner splits data when it encounters \n, so we set it to split data by words,
	//    so it will split data when it encounters whitespace or word-termination symbol like punctuation
	scanner.Split(bufio.ScanWords)

	var words []string
	// 3. .Scan() method on our scanner can result in multiple calls to .Read() method on conn object,
	//    until it gets data or an error is encountered
	//    tip: scanner.Err() will have the error, io.EOF will make scanerr.Err() nil, not error.
	for scanner.Scan() {
		// 4. .Text() on scanner takes the data chunk from scanner like a word + punctutation or just a word
		//    without a space next to it
		words = append(words, scanner.Text())
	}

	err = scanner.Err()
	if err != nil {
		log.Fatal(err)
	}

	expected := []string{"The", "bigger", "the", "interface,", "the", "weaker", "the", "abstraction."}
	if slices.Equal(words, expected) {
		log.Fatal("inaccurate scanned word list")
	}

	log.Fatalf("Scanned words: %#v", words)
}
