package main

import (
	"bytes"
	"fmt"
	"log"
	"os"

	"log/slog"
)

// as of 2024, the slog package is the best for logging,
// more here: https://go.dev/blog/slog.

// go provides pacages for simple log utilities like: log,
// and for more structured logs: log/slog.
// go read the package for better understanding just in case you need it.

func main() {

	// a simple println from a log uses the standard logger,
	// which is already preconfigured for output to os.Stderr.
	//
	// methods like log.Fatal* or log.Panic* will abort the program
	log.Println("standard logger") // 2023/08/22 10:45:16 standard logger

	// loggers can be configured with flags to set their output format.
	// by default, the standard logger has the log.Ldate and log.Ltime flags set,
	// and these are collected in log.LstdFlags.
	// you can change its flags to emit time with microsecond accuracy, for example.
	log.SetFlags(log.LstdFlags | log.Lmicroseconds)
	log.Println("with micro") // 2023/08/22 10:45:16.904141 with micro

	// you can also set flags for file name and line from which the log function is called
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	log.Println("with file/line") // 2023/08/22 10:45:16 logging.go:40: with file/line

	// it may be useful to create a custom logger and pass it around.
	// when creating a new logger,
	// we can set a prefix to distinguish its output from other loggers.
	mylog := log.New(os.Stdout, "my:", log.LstdFlags)
	mylog.Println("from mylog") // my:2023/08/22 10:45:16 from mylog

	// you can set prefixes on custom and standard logger, here we change the custom one
	mylog.SetPrefix("ohmy:")
	mylog.Println("from mylog") // ohmy:2023/08/22 10:45:16 from mylog

	// logger can have custom output targets, any io.Writer works
	var buf bytes.Buffer
	buflog := log.New(&buf, "buf:", log.LstdFlags)

	// this will write to the buf
	buflog.Println("hello")

	// this will show what was written in to buf
	fmt.Print("from buflog:", buf.String())

	// slog package provides a structured logger with json format,
	// more: https://go.dev/blog/slog
	jsonHandler := slog.NewJSONHandler(os.Stderr, nil)
	myslog := slog.New(jsonHandler)
	myslog.Info("hi there")
	// {
	//   "time":"2023-08-22T10:45:16.904166391-07:00",
	//   "level":"INFO",
	// 	 "msg":"hi there"
	// }

	myslog.Info("hello again", "key", "val", "age", 25)
	// {
	//   "time":"2023-08-22T10:45:16.904166391-07:00",
	//   "level":"INFO",
	//   "msg":"hello again",
	//   "key": "val",
	//   "age": 25
	// }
	// in reality, json structured logs are inlined
}
