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
