// browser api that was meant to replace xhtmlrequest
//
// it returns a promise, so can be used as one.

// Basic fetch Example
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => response.json())
  .then((data) => console.log(data))

// POST Request
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))

// Handling Errors
fetch('https://jsonplaceholder.typicode.com/invalid-url')
  .then((response) => {
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    return response.json()
  })
  .catch((err) => console.error(err.message))

// Timeout with AbortController
const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 5000)

fetch('https://jsonplaceholder.typicode.com/posts', {
  signal: controller.signal,
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) =>
    console.error(err.name === 'AbortError' ? 'Request timed out' : err)
  )
  .finally(() => clearTimeout(timeout))

// Concurrent Requests
Promise.all([
  fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) =>
    res.json()
  ),
  fetch('https://jsonplaceholder.typicode.com/users/1').then((res) =>
    res.json()
  ),
]).then(([post, user]) => {
  console.log('Post:', post)
  console.log('User:', user)
})

// Stream Large Data
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.body.getReader())
  .then((reader) => {
    const decoder = new TextDecoder()
    reader.read().then(function process({ done, value }) {
      if (done) return
      console.log(decoder.decode(value))
      return reader.read().then(process)
    })
  })
