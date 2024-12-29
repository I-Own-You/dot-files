package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
)

func signals() {

	// actually,
	// channel could be empty,
	// but .Notify need at least 1 capacity because at least 1 signal is expected
	sigs := make(chan os.Signal, 1)

	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	done := make(chan bool)

	go func() {

		sig := <-sigs
		fmt.Println()
		fmt.Println(sig)
		done <- true
	}()

	fmt.Println("awaiting signal")
	<-done
	fmt.Println("exiting")
}
