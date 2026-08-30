package main

import (
	"fmt"
	"time"
)

// go offers extensive support for time and durations with time pkg

func TimeFunctionality() {
	p := fmt.Println

	now := time.Now()
	p("now:", now)

	then := time.Date(
		2009, 11, 17, 20, 34, 58, 651387237, time.UTC)
	p("then:", then)

	p("then.year:", then.Year())
	p("then.month:", then.Month())
	p("then.dayy:", then.Day())
	p("then.hour:", then.Hour())
	p("then.minute:", then.Minute())
	p("then.seconds:", then.Second())
	p("then.Nanosecond:", then.Nanosecond())
	p("then.location:", then.Location())

	p("then.weekday:", then.Weekday())

	p("then.before:", then.Before(now))
	p("then.after:", then.After(now))
	p("then.equal:", then.Equal(now))

	diff := now.Sub(then)
	p("diff.diff:", diff)

	p("diff.hours:", diff.Hours())
	p("diff.minutes:", diff.Minutes())
	p("diff.seconds:", diff.Seconds())
	p("diff.nanoseconds:", diff.Nanoseconds())

	p("diff.add.diff:", then.Add(diff))
	p("diff.ddd.-diff:", then.Add(-diff))
}
