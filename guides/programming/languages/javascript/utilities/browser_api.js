// depending on the browser, they all give some funcionalities to javascript, there are more:
// window - the actual browser window tab where all happens
// navigator - info about browser
// screen - info about the screen of the browser
// location - info about the current page and do actions with it, go to another page, for example
// fetch() - make requests to the server
// history - history of the browser which is restricted to the current page we are in,
//           go back or forward for example
// localStorage - a special browser storage to store some data across some time
// sessionStorage - a special storage to store some data while we are in the browser,
//                  and deleting it once we close it
// indexDB - like localStorage but better, check info on mdn
// cache api - check on mdn
// file storage - check on mdn

// DOM - document object model,
//
// it is created by the browser on page load(through DOMContentLoad event),
// its content is a tree containing all the nested html tags, and put into document variable.
// it is used to add, delete, change, style the html elements.
//
// it contains node elements,
// and textual nodes, node elements are the tags and all the info about it and within it,
// textual elements are nodes that dont have continuation.

// adding events:
const element = document.querySelector('button')
element.addEventListener('click', function (event) {
  // event is the name of the event
  alert('anonymous function')
})
element.addEventListener('click', (event) => {
  alert('anonymous function')
})
function handleClickFunction(event) {
  alert('function expression')
}
element.addEventListener('click', handleClickFunction)

// anonymous functions are faster to write, they cant be removed with [elementNode].removeListener()

// funciton expressions can be assigned to multiple elements,
// also they can be removed with element.removeEvenListener()

// signature of the event:
// element.addEventListener(eventType, handler, options)
//
// element — any elment on the dom
// eventType — event name, like 'click', 'submit'
// handler — function which will be executed
// options/capture — optional parameter that describes some states:
//     capture — true/false, will event work on element and then on the inner elements of it
//     options: { capture: bool, passive: bool, once: bool }
//         passive – means event.preventDefault() wont be executed in handler,
//                   and will trigger a warning on use
//         once – means the event will work only once

// you must put same arguments for .addEventListener() and .removeEvenListener() because
// if not, the event wont be deleted:
function handleMouseClick(event) {
  console.log('Вы нажали на элемент:', event.target)
}
window.addEventListener('click', handleMouseClick, true)
window.removeEventListener('click', handleMouseClick)
// wont delete, becaues it doesnt have 3 arguemnt, true, it is undefined

// script that are put above html content, wont see whats below,
// so it must be put at the end of body, after body, or execute after DOMContentLoad event,
// or using html attibutes of script inside .html file

// be aware, writing loops on htmlcollections,
// they are alive objects,
// and they update if dom adds an element that can be added dynamically in your htmlcollection:

// document.cookie (this way you can work with cookie)

// window.localStorage (this way you can work with localstorage)

// window.sessionStorage (this way you can work with sessionStorage)

// Events
//
// there are also .on[event-name] methods, but they can be assigned one time,
// so they are not suitable to use if you need more than 1 event, to remove them set .on[event-name] = null
//
// event bubbling - the way event are triggered:
// so if you click on child event, js start from top of html dom, finds the element,
// executes the event, and then the event will bubble up,
// meaning that the parent of the child will execute its event(if it has) and so on.
//
// event.stopPropagation():
// will stop the event bubbling on the element on which was executed stopPropagation()
//
// you can also access the element on which the events are happening with [this] keyword
//
// [event] object from the callback function in the addEventListener() is
// an object which is reponsible and holds information about the event triggered and some useful methods
//
// you can create your own event:
const myEvent = new CustomEvent('my-event', {
  detail: {
    spicy: 123,
  },
})
window.addEventListener('my-event', function (evt) {
  console.log('field spicy:', evt.detail.spicy)
})
window.dispatchEvent(myEvent)
//
// if you have a form for example,
// an input and a button with 'click' event on it and if you press enter,
// the browser will trigger the events on the button if no event is attached to the submit input type
//
// DOMContentLoaded event occurs when browser finished to parse the page and made the dom-tree.
// if you need the page to fully load, then 'load' event might be better.
// DOMContentLoaded occurs earlier than load, so you can work with dom safely, but not styles, images, etc
//
// load event is like DOMContentLoaded but guarantees taht page is fully loaded with styles, images, .etc,
// so you can work fully with the page
//
// unload event is when user leaves the page,
// but it wont catch all the methods user can use to leave the page, so be aware

// navigator.sendBeacon() - non blocking method to send some data (async)
// it is not that safe in some circumstances
// (if user visits the page on the phone,
//  if user changes active app,
//  if user closes browser through app manager)
//
// visibilitychange() - better approach than navigator.sendBeacon()

// beforeunload - event that occurs before you leave the page
// you can also use window.onbeforeunload method, its the same

// event.preventDefault() - prevents the default event on an element, like <a> going to another link

// setTimeout() - is a webAPI tool in the browser, and not a full thing from js

// Event Loop is responsilbe for the fact that when will an event occur and how and where it will put it.
// for example:
function main() {
  setTimeout(function greet() {
    // stack: setTimeout, main. After setTimeout leaves stack, setTimeout(greet) is placed in webAPI
    console.log('Hello!')
  }, 2000)
  // executes it, then stack is:console.log('Bye!'), main. webAPI is still setTimeout(greet)
  console.log('Bye!')
}
main()
// stack: main
//
// 1. when main() finishes, thes stack is empty, but webAPI is still setTimeout(greet)
// 2. 2000 ms passed, now greet() form setTimeout is passed to the task order,
//    so stack is empty, webAPI is empty, task order: greet()
// 3. task order now puts greet into stack order
// 4. stack order is now: console.log('Hello!'), greet()
// 5. after console.log() is executed, and greet is left, the stack is empty
//
// this is how async code is possible through just simple callback(but its bad because of the callback hell,
// when a functino calls another and so on)

// fetch() - function to send/get request from/to a server
//
// returns a promise with Response object that has 2 important attributes:
// .ok(true or false) for the success of the operation,
// .json() returns the data as json format
fetch('http://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) => data)
//
// it takes 2 parameters, the url and the options(optional):
fetch('http://jsonplaceholder.typicode.com/posts') // the default operation is get request
//
// the 404 error and error related code like that wont result in .catch() because it fullfilled,
// the only way to get an error is fetching being disturbed somehow or canceled
fetch('https://jsonplaceholder.typicode.com/there-is-no-such-route')
  .then((response) => {
    if (!response.ok) {
      // check if fetch succeeded
      throw new Error('Error occurred!') // if not, throw an error
    }

    return response.json()
  })
  .catch((err) => {
    // got here because we threw an error
    console.log(err)
  }) // Error: Error occurred!
//
// options paramter has everyting you need to get/pass data to/from the server, an example:
const newPost = {
  title: 'foo',
  body: 'bar',
  userId: 1,
}
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(newPost),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data) // {title: "foo", body: "bar", userId: 1, id: 101}
  })

// some apis
//
// window.geolocation api - works with the users location
// window.matchMedia() api - get access to media query and not only
// URLSearchParams - api to make paramteres for url more easier
// performace - api to measure things with high precision
// alert() - api to show a modal info at the top center of the browser(will block the browser)
// prompt() - same as alert() but will take an input and return it, blocks browser as well
// confirm() - api, display a modal with 'ok' and 'cancel' buttons, returns boolean, also blocks the browser
// queueMicrotask() - api to execute a function in microtasks, only after the tasks stack is empy

// setTimeout() - api to execute a function in async mode(but he function itself will be sync):
// takes function, duration(ms), param1, paramN..(paramters taht will be used in function, no matter how many)
setTimeout(
  function (greeting) {
    console.log(`Через секунду напечатаю «${greeting}»`)
  },
  1000,
  'Привет'
)
// returns the duration it was set to
// it will always wait for the sync code from the main thread to execute, then it will execute itself
//
// clearTimeout() - removes the time used for setTimeout(), that the function in setTimeout() wont execute,
// takes the paramter that is the duration of the setTimeout()

// setInterval() - same as setTimeout() but will execute forever with that interval and not only 1 time,
// be aware, its a tricky function, for example if it executes longer that its interval was set,
// then it will execute on and on without the interval, so setTimeout() could be better
//
// clearInterval() - same as clearTimeout()

// window.print() - runs the printer
// window.open() - opens a new link, takes 3 param(url, target, options)
// Intersection Observer - api, detects an element that crosses with its parent or some scope in async way
