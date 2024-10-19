package main

import (
	"fmt"
	"time"
)

// go support time formattin and parsing via pattern-based layouts

func TimeFormattingAndParsing() {
	p := fmt.Println

	t := time.Now()
	p("1: ", t.Format(time.RFC3339))

	t1, e := time.Parse(
		time.RFC3339,
		"2012-11-01T22:08:41+00:00")
	p("2: ", t1)

	p("3: ", t.Format("3:04PM"))
	p("4: ", t.Format("Mon Jan _2 15:04:05 2006"))
	p("5: ", t.Format("2006-01-02T15:04:05.999999-07:00"))
	form := "3 04 PM"
	t2, e := time.Parse(form, "8 41 PM")
	p("6: ", t2)

	fmt.Printf("%d-%02d-%02dT%02d:%02d:%02d-00:00\n",
		t.Year(), t.Month(), t.Day(),
		t.Hour(), t.Minute(), t.Second())

	ansic := "Mon Jan _2 15:04:05 2006"
	// invalid format so an error is returned
	_, e = time.Parse(ansic, "8:41PM")
	p(e)
}
