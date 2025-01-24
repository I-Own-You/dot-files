// localStorage
// 1. read-only property of the window interface,
// 2. allows you to access a Storage object for the Document's origin;
// 3. the stored data is saved across browser sessions.

// localStorage is similar to sessionStorage,
// except that while localStorage data has no expiration time,
// sessionStorage data gets cleared when the page session ends (when the page is closed)

// in "private browsing" or "incognito", localStorage is cleared when last private tab is closed

// localStorage data is specific to the protocol of the document.
// 1. for http, returns different object
// 2. for https, returns different object

// for file: protocol, the behaviour is defined for different browsers differently,
// in most cases each file: protocol(1 tab), the localStorage is unique, but dont rely on this behaviour.

localStorage.setItem('myCat', 'Tom')
const cat = localStorage.getItem('myCat')
localStorage.removeItem('myCat')
localStorage.clear()

// under the hood, localStorage uses Storage object

// all 3 lines are identic
localStorage.colorSetting = '#a4509b'
localStorage['colorSetting'] = '#a4509b'
// but this is the recommended way, because there are pitfalls with above approaches
localStorage.setItem('colorSetting', '#a4509b')

// actually its a window global proerty, but all global peropertis of window are available,
// but dont define a variable with the same name, as it will shadow the window one.
window.localStorage

// actually, localStorage can be available, but the browser can set its limit to 0,
// so it means we cant use it and we will get an error like "limit exceeded quota",
// but the actual localStorage is there, its just not available.

// keys and values of localStorage can only be strings,
// so if you have other data type, you must convert it into strings first to use it as key/value

// limit for localStorage is around 5mb,
// then, content is removed byt least recently used data.
