// async api, runs only after all sync code on the main stack in program finished

// Basic Usage
setTimeout(() => console.log('Hello, world!'), 1000) // Runs after 1 second

// Cancel a Timeout
const timeoutId = setTimeout(() => console.log("This won't run"), 1000)
clearTimeout(timeoutId) // Cancels the timeout

// Chaining Delays
setTimeout(() => {
    console.log('Step 1')
    setTimeout(() => console.log('Step 2'), 1000)
}, 1000)

// Passing Arguments
setTimeout((name) => console.log(`Hello, ${name}!`), 1000, 'Alice')

// Simulating Intervals
function repeatMessage(message, delay, count) {
    if (count <= 0) return
    setTimeout(() => {
        console.log(message)
        repeatMessage(message, delay, count - 1)
    }, delay)
}
repeatMessage('Ping', 1000, 3)

// Synchronizing with Other Code
console.log('Start')
setTimeout(() => console.log('Middle'), 0)
console.log('End')
// Output: Start -> End -> Middle

// Recursive Timeout for Polling
function poll() {
    console.log('Checking...')
    setTimeout(poll, 2000) // Repeats every 2 seconds
}
poll()
