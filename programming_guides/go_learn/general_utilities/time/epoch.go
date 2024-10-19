package main

import (
	"fmt"
	"time"
)

// you can also get the time from epoch, its the time unix system started

func EpochFunctionality() {

	now := time.Now()
	fmt.Println("now: ", now)

	// this way you can get how much time passed since epoch until now or any time you want
	fmt.Println("now.unix:", now.Unix())
	fmt.Println("now.unixmilli:", now.UnixMilli())
	fmt.Println("now.unixnanno:", now.UnixNano())

	// here you can get the actual time, not seconds, miliseconds, nanoseconds, but date format
	// here you pass the first argumetn as seconds passed since epoch,
	// second argument is nanoseconds passed.
	fmt.Println(time.Unix(now.Unix(), 0))
	fmt.Println(time.Unix(0, now.UnixNano()))
	// difference between these 2 kind of identical forms have differences only in output:
	// 1. 2024-09-13 05:12:06 +0300 EEST // no miliseconds
	// 2. 2024-09-13 05:12:06.106940543 +0300 EEST // milliseconds given
}
