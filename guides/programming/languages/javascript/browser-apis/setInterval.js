// Basic Usage
setInterval(() => console.log('Hello, world!'), 1000) // Runs every 1 second

// Clearing an Interval
const fintervalId = setInterval(() => console.log("This won't run long"), 1000)
setTimeout(() => clearInterval(fintervalId), 5000) // Stops after 5 seconds

// Counting Down
let count = 5
const sintervalId = setInterval(() => {
  console.log(count--)
  if (count < 0) clearInterval(sintervalId)
}, 1000)

// Synchronizing with Date
setInterval(() => {
  const now = new Date()
  console.log(`Current Time: ${now.toLocaleTimeString()}`)
}, 1000)

// Pausing and Resuming
let paused = false
const tintervalId = setInterval(() => {
  if (!paused) console.log('Running...')
}, 1000)

setTimeout(() => (paused = true), 3000) // Pause after 3 seconds
setTimeout(() => (paused = false), 6000) // Resume after 6 seconds

// Simulating Animation
let position = 0
const ffintervalId = setInterval(() => {
  console.log('Position:', position++)
  if (position > 10) clearInterval(ffintervalId)
}, 100)

// Nested Intervals for Dynamic Changes
let delay = 1000
function dynamicInterval() {
  setTimeout(() => {
    console.log('Interval with delay:', delay)
    delay -= 200
    if (delay > 0) dynamicInterval()
  }, delay)
}
dynamicInterval()
