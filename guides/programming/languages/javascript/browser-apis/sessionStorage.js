// read-only sessionStorage property accesses a session Storage object for the current origin.

// sessionStorage is similar to localStorage;
// the difference is that while data in localStorage doesn't expire,
// data in sessionStorage is cleared when the page session ends.

// 1. whenever a document is loaded in a particular tab in the browser,
//    a unique page session gets created and assigned to that particular tab.
//    that page session is valid only for that particular tab.
// 2. a page session lasts as long as the tab or the browser is open,
//    and survives over page reloads and restores.
// 3. opening a page in a new tab or window creates a new session with the value of
//    the top-level browsing context, which differs from how session cookies work.
// 4. opening multiple tabs/windows with the same URL creates sessionStorage for each tab/window.
// 5. duplicating a tab copies the tab's sessionStorage into the new tab.
// 6. closing a tab/window ends the session and clears objects in sessionStorage.

// data stored in sessionStorage is specific to the protocol of the page:
// 1. HTTP is put in a different sessionStorage object
// 1. HTTPS is put in a different sessionStorage object

sessionStorage.setItem('key', 'value')
let data = sessionStorage.getItem('key')
sessionStorage.removeItem('key')
sessionStorage.clear()

// under the hood, sessionStorage uses Storage object

// all 3 lines are identic
sessionStorage.colorSetting = '#a4509b'
sessionStorage['colorSetting'] = '#a4509b'
// but this is the recommended way, because there are pitfalls with above approaches
sessionStorage.setItem('colorSetting', '#a4509b')

// actually its a window global proerty, but all global peropertis of window are available,
// but dont define a variable with the same name, as it will shadow the window one.
window.sessionStorage

// keys and values of sessionStorage can only be strings,
// so if you have other data type, you must convert it into strings first to use it as key/value

// 'storage' event fires when some changes happen to Storage object,
// 1. it doesnt fire for sessionStorage
// 2. it dosent fire for page where changes are made(so, only other page on the same domain can use it)
window.addEventListener('storage', (e) => {
    console.log(Object.defineProperties(e))
})
