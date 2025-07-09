// async/await - just a sugar syntax for promise:
async function getStarWarsMovie(id) {
    const response = await fetch(`https://swapi.dev/api/films/${id}/`)
    console.log('rsponse', response) // 1
    return response.json()
}
const movies = getStarWarsMovie(1).then((movie) => {
    console.log(movie.title)
}) // 2
console.log('result:', movies) // 3

//  you cant use await for non async code

// you can also mix the code, but it isnt that readable:
const [user, news] = await Promise.all([getUser(), getNews()])

// also you can use try/catc inside async/await, this way you can catch async error

// async functions return promises under the hood
async function request() {}
const req = async () => {}
req().then(() => {})
request().then(() => {})

// .then() isnt the only way to work with promises and call them:
async function loadPosts() {
    // await is just the same as if we would call .then() on chain
    const response = await fetch('/api/posts/')
    const data = await response.json()
    return data
}
