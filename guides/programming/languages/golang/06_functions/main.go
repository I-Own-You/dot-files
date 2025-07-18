package main

import (
	"fmt"
)

func plus(a int, b int) int {
	return a + b // you must always return if you function has an explicit return type
}

// if all parameters have the same type, they can be aligned
func plusPlus(a, b, c int) int {
	return a + b + c
}

// you can return multiple values, here is 2 ints, returned values types can be different
func vals() (int, int) {
	return 3, 7
}

// you can define variables inside return braces, their default values will be its zered type, they are like,
// regular variables defined inside a function, but not so convenient in real world.
// usually you return when 2+ values are returned and also for better naming for clarity.
func anotherFunc() (a int, b int) {
	return a, b

}

// its called a variadic function, it can take more than 1 parameters without specifying all parameters variables.
// nums will be []int type, a slice. you can operate with it as you would with a slice.
// you can also have parameters before they will be packed into a slice, like: func sum(a int, nums ...int) {},
// but the packed parameters must be the final parameter.
func sum(nums ...int) {
	fmt.Print(nums, " ")
	total := 0
	for _, num := range nums {
		total += num
	}
	fmt.Println(total)
}

// go support anonymous function that can create a closure
// intSeq here returns an anonymous function which return a closure around i variable,
// which means that any variable that was assigned with function intSeq will hold the state of variable i.
func intSeq() func() int {
	i := 0
	return func() int {
		i++
		return i
	}
}

// go supports recursive functions
func fact(n int) int {
	if n == 0 {
		return 1
	}
	return n * fact(n-1)
}

func myFunc() func() {
	// func myFunc2() {} // function inside function is not allowed
	// but anonymous function assigned to variables are allowed
	a := func() {}
	// you could return it
	return a
	// or you could return the anonymous function itself without variable
	return func() {}
}

func main() {

	// this is how you call a function
	res := plus(1, 2)
	fmt.Println("1+2 =", res)
	res = plusPlus(1, 2, 3)
	fmt.Println("1+2+3 =", res)

	// this is how you can get the values from the function with multiple return values
	a, b := vals()
	fmt.Println(a)
	fmt.Println(b)

	// you can also omit values that you dont want to get
	_, c := vals()
	fmt.Println(c)

	// here is how you can call a variadic function
	sum(1, 2)
	sum(1, 2, 3)

	// you can also unpack a slice and use it in a variadic functionnums := []int{1, 2, 3, 4}
	nums := []int{1, 2, 3, 4}
	sum(nums...)

	// here we call intSeq which return an anonymous function.
	// nextInt forms a closure which captures all its internals, in this case the variable i,
	// which will update every time we will call nextInt() because of ++i, return i
	nextInt := intSeq()
	fmt.Println(nextInt()) // 1
	fmt.Println(nextInt()) // 2
	fmt.Println(nextInt()) // 3, and so on...

	// creation of another closure will have its state
	anotherNextInt := intSeq()    // new closure
	fmt.Println(anotherNextInt()) // 1, not 4
	fmt.Println(anotherNextInt()) // 2, not 5
	fmt.Println(anotherNextInt()) // 3, not 6 and so on...

	// call the recursive function
	fmt.Println(fact(7))

	// you can also have a function type, which is just an anonymous function not initialized
	var fib func(n int) int // nil, as zeroed value of func type is nil
	// here you assign an anonymous function to a variable of anonymous function type with same signature as above
	// you could also do this fib = fact, if fact has the same signature as fib
	fib = func(n int) int {
		if n < 2 {
			return n
		}
		return fib(n-1) + fib(n-2)
	}
	// and call it
	fmt.Println(fib(7))

	// anonymously executed functoin
	var AnonFunc = func(a int, b int) int {
		return a + b
	}(1, 2) // or you could remove the invocation (1,2) and invoke it with AnonFunc(1,2)
	fmt.Printf("AnonFunc: %v\n", AnonFunc) // here AnonFunc will be the execution result of anonymous function

	// you can have nested functios in anonymous function, they must be also anonymous
	outerFunc := func(x int) func(y int) int {
		// Inner anonymous function
		innerFunc := func(y int) int {
			fmt.Println(x, y)
			return x * y
		}

		return innerFunc
	}
	fmt.Printf("outerFunc(5): %v\n", outerFunc(5)(2))
}
