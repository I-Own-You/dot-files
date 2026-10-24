package tcp

import (
	"errors"
	"flag"
	"fmt"
	"net"
	"os"
	"time"
)

var (
	count    = flag.Int("c", 3, "number of pings: <= 0 means forever")
	interval = flag.Duration("i", time.Second, "interval between pings")
	timeout  = flag.Duration("W", 5*time.Second, "time to wait for a reply")
)

func init() {
	flag.Usage = func() {
		fmt.Printf("Usage: %s [options] host:port\nOptions:\n", os.Args[0])
		flag.PrintDefaults()
	}
}

// TryPing shows how can you use the ping technique using tcp connection timeout
func TryPing() {
	flag.Parse()

	if flag.NArg() != 1 {
		fmt.Print("host:port is required\n\n")
		flag.Usage()
		os.Exit(1)
	}

	target := flag.Arg(0)
	fmt.Println("PING", target)

	if *count <= 0 {
		fmt.Println("CTRL+C to stop.")
	}

	msg := 0
	for (*count <= 0) || (msg < *count) {
		msg++
		fmt.Print(msg, " ")

		start := time.Now()
		// 1. the technique is basically make a tcp connection without read/write data
		//    and look if the other connection responds with something so we can acquire
		//    the connection object
		c, err := net.DialTimeout("tcp", target, *timeout)
		dur := time.Since(start)
		if err != nil {
			fmt.Printf("fail in %s: %v\n", dur, err)
			if errTimeout, ok := errors.AsType[net.Error](err); !ok && !errTimeout.Timeout() {
				os.Exit(1)
			}
		} else {
			_ = c.Close()
			fmt.Println(dur)
		}

		time.Sleep(*interval)
	}
}
