package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"
)

// 1. context carries a deadline, cancellation signal, and request-scoped values across API boundaries
// 2. context methods are safe for simultaneous use by multiple goroutines

// this is an example of context pkg implementation
type Context interface {
	// returns a channel that is closed when context is canceled or times out.
	Done() <-chan struct{}

	// indicates why this context was canceled, after done channel is closed.
	Err() error

	// returns the time when this Context will be canceled, if any.
	Deadline() (deadline time.Time, ok bool)

	// returns the value associated with key or nil if none.
	Value(key any) any
}

// background is the root of any Context tree; it is never canceled:
// Background returns an empty Context. It is never canceled, has no deadline,
// and has no values. Background is typically used in main, init, and tests,
// and as the top-level Context for incoming requests.
func Background() Context

// WithCancel returns:
//  1. derived Context values that can be canceled sooner than the parent Context.
//  2. a copy of parent whose Done channel is closed as soon as parent.Done is closed or cancel is called.
func WithCancel(parent Context) (ctx Context, cancel CancelFunc)

// A CancelFunc cancels a Context.
type CancelFunc func()

// WithTimeout returns:
//  1. a copy of parent whose Done channel is closed as soon as parent.Done is closed,
//     cancel is called, or timeout elapses.
func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)

// WithValue:
//  1. provides a way to associate request-scoped values with a Context
//  2. returns a copy of parent whose Value method returns val for key.
func WithValue(parent Context, key any, val any) Context

// so as far as you understood,
// WithCancel and WithTimeout creates a stack from previous context and are cancelled/timeout,
// if any of its parent is cancelled/timed out or they do it themselves

// non http example:
type ctxKey string

func main() {
	nonHttpExample()
	// httpExample()
}

func nonHttpExample() {

	rootCtx := context.Background()

	ctxWithValue := context.WithValue(rootCtx, ctxKey("userID"), 42)

	ctx, cancel := context.WithCancel(ctxWithValue)
	defer cancel() // always defer cancel to release resources

	ctxTimeout, cancelTimeout := context.WithTimeout(ctx, 3*time.Second)
	defer cancelTimeout()

	go func(c context.Context) {
		for i := 1; i <= 5; i++ {
			select {
			case <-c.Done():
				fmt.Println("Worker stopped:", c.Err())
				return
			default:
				fmt.Println("Working...", i, "UserID:", c.Value(ctxKey("userID")))
				time.Sleep(1 * time.Second)
			}
		}
		fmt.Println("Work finished successfully")
	}(ctxTimeout)

	// uncomment to test parent cancel
	// time.Sleep(2 * time.Second)
	// cancel()

	time.Sleep(5 * time.Second)
	fmt.Println("Main function exiting")
}

func httpExample() {
	mux := http.NewServeMux()
	mux.HandleFunc("/process", processHandler)

	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	fmt.Println("Server listening on http://localhost:8080")
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func processHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		userID = "anonymous"
	}
	ctx = context.WithValue(ctx, ctxKey("userID"), userID)

	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel() // always cancel to release resources

	done := make(chan struct{})
	go func(c context.Context) {
		defer close(done)

		for i := 1; i <= 10; i++ {
			select {
			case <-c.Done():
				fmt.Println("Processing stopped:", c.Err())
				return
			default:
				fmt.Println("Processing step", i, "for user", c.Value(ctxKey("userID")))
				time.Sleep(500 * time.Millisecond)
			}
		}

		fmt.Println("Processing finished successfully for user", c.Value(ctxKey("userID")))
	}(ctx)

	select {
	case <-done:
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Processing finished successfully"))
	case <-ctx.Done():
		err := ctx.Err()
		fmt.Println("Request finished early:", err)
		http.Error(w, err.Error(), http.StatusRequestTimeout)
	}
}

// 1. contexts should not be stored inside a struct type, but instead passed to each function that needs it
//    but if you need, in rare cases, you can store it in struct, for compatibility mode or whatever, but anyway,
//    if you add a context in struct you will still assign the context from a function parameter to it (you better do),
//	  so context in a struct is really better not used, because a context for a struct could be accessed from anywhere,
//    in the code, which makes it less versatile and even dangerous to break something.
// 2. you should always cancel context to retrieve resources from it,
//    even if context was created locally inside a gorotuine,
//    GC wont cleanup until its closed/timedout, so if you close it right away, GC gets resources and free it,
//    if you did it with WithTimeout and exit earlier,
//    the timeout still exists and GC will only free resources after that timeout
// 3. the key from the context value is safe, but the actual value is NOT, it means:
//    1. ctx := WithValue(context.Background(), "myKey", myMap),
//       it means "myKey" is safe to access in different goroutines,
// 	     but myMap is NOT, you should make it safe with synching, .etc.
//       the key/value can be of any type: WithValue(ctx, myStruct, mySlice),
//    2. use custom types for keys to avoid collisions: type myPrivate string, const a myPrivate = "myKey",
//       WithValue(ctx, a, "myVal"), the evading technique here is that even if 2 people use "myVal"
//       it wont collied because myPrivate("myVal") != string("myVal")
//    3. KEY must be of COMPARABLE type: int,string,pointer, struct(which fields are all of comparable type)
