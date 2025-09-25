package main

import (
	"fmt"
	"testing"
)

// theres also tests for parallel: https://pkg.go.dev/testing

// go testing package provides utilities for creating test for go applications
// there are a lot more info on the go docs and blog posts

// typically the functiion being tested on would be in its file somehwere else
func IntMin(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// a test is written by writing the first word Test,
// and then the function being tested and some suffixes if needed,
// the test file would also be in another folder like tests/,
// and the file name starting with the function name and _test being the ending,
// like intutils(the filename) and the ending _test so it would be intutils_test.go
func TestIntMinBasic(t *testing.T) {
	ans := IntMin(2, -2)
	if ans != -2 {
		// errors would be reported,
		// but the tests will continue and will stop only if t.Fatal error will arise.
		t.Errorf("IntMin(2, -2) = %d; want -2", ans)
	}
}

// typically its idiomatic to have a table of testing cases and loop over it, if they are repetitive
func TestIntMinTableDriven(t *testing.T) {
	var tests = []struct {
		a, b int
		want int
	}{
		{0, 1, 0},
		{1, 0, 0},
		{2, -2, -2},
		{0, -1, -1},
		{-1, 0, -1},
	}

	for _, tt := range tests {

		testname := fmt.Sprintf("%d,%d", tt.a, tt.b)
		// t.Run enables running subtests, one for each table entry as we are in a range of tests entries,
		// they are shown, separately in command line, so the main test execution and all the nested t.Run() ones
		t.Run(testname, func(t *testing.T) {
			ans := IntMin(tt.a, tt.b)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}

// benchmarking typically is also in a benchmark(some_name)_test.go file
//
// testing runner executes each benchmark function several times,
// increasing b.N on each run until it collects, a precise measurement.
// you can change for how long the benchmark will work in cli
//
// benchmarks are runned with: go test -bench=. //bench flag filters function names starting with bench
// other tests are runned with: go test -v
func BenchmarkIntMin(b *testing.B) {

	for b.Loop() { // a modern way would be for b.Loop() { }
		// typically the benchmark runs a function b.N times
		IntMin(1, 2)
	}
}
