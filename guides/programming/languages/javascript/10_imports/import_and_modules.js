// modules - a file that helps with code reusability and structure
// 1. modules are visiblie in their own scope
//    (this means that code isnt visible unless its exported, unlike regulat js files),
//    unlike regular js files that have global scope.
//    if a file has at the top import/export than its treated as a module.
// 2. if a file at the top doesnt contain import/export/await, then its not a module (js, not ts)
// 3. if you import * without as alias, you cant access default export (its a js thing, not ts)
// 4. if you import without alias, just the file, the file gets evaluated,
//    but nothing imported (could affect other objects and etc, again, js, not ts thing)

// CommonJS - a module system from NodeJS
// AMD - the oldest module system
// UMD - a universal module system
// ES-Modules - the builtin javascript module system

// ES-Modules:
// module1.js
export function sum(a, b) {
  return a + b
}
export const SOME_SETTINGS_FLAG = false
export const someUser = {}
export const books = ['a', 'b']
// module2.js
import { sum } from './module1.js'
import { someUser, books } from './module1.js'
import { user as admin } from './module1.js' //change the name
import { books as library, SOME_SETTINGS_FLAG as turnedOn } from './module1.js'
//
const module2User = {}
export { module2User } // its a block code where you can specify exports, just like import {},
//                        instead of putting export in front of every thing you want to export
const module2UesrAnother = {}
export { module2UesrAnother as admin } // also change the name

// we can also export as 'default', it means that the module that will import it, will need to name it:
// only 1 default export is allowed per module(file)
//
// sum.js
export default function (a, b) {
  return a + b
}
// other-module.js
import sum from './sum.js'
import superCoolSummator from './sum.js'

// modules(.mjs) are always in strict mode

// the code from the module that is imported will execute once while importing:
// module1.js
export const exportMyUser = { name: 'Alex' }
console.log(exportMyUser.name)
// module2.js
import { exportMyUser } from './module1.js' // 'Alex'.
import { exportMyUser } from './module1.js' // nothing will be logged
//
// so importing code, for example an object, can be changed by others, so be aware:
// module1.js
export const changedUser = { name: 'Alex' }
// module2.js
import { changedUser } from './module1.js'
console.log(user.name) // 'Alex'
delete user.name
// module3.js
import { changedUser } from './module1.js'
console.log(user.name) // undefined'
//
// a better approach
//
// module1.js
export function createUser() {
  return { name: 'Alex' }
}
// module2.js
import { createUser } from './module1.js'
const betterApproach = createUser()
delete betterApproach.name
// module3.js
import { createUser } from './module1.js'
const createdUser = createUser()
console.log(createdUser.name) // 'Alex'

// modules in the browser:
// <body>
//   <script src="module1.js" type="module"></script>
//   <script src="module2.js" type="module"></script>
// </body>
// the modules wont execute untill the DOM is loaded, the order is preserved.
//
// modules wont execute more than 1 time if it was declared more than 1 time.
//

// the path must be realtive or absolute:
import user from 'user' // wrong
import user from 'https://some-site.com/js/user.js'
import user from './user.js'

// you can also import and export at the same time:
export { user } from './user.js' // same as below
import { user } from './user.js'
export { user }

// dynamic imports:
let modulePath = prompt('which module to load?')
import(modulePath) // its a promise under the hood, so .then, .catch can be used
// import() loads the module and returns a promis which value will be all the exports of the module
// 📁 say.js
export function hi() {
  alert(`Привет`)
}
export function bye() {
  alert(`Пока`)
}
// another file
let { hi, bye } = await import('./say.js')
hi()
bye()
// if a module has export default, then:
// 📁 say.js
// commented, because prettier formatter complains about second default export
// export default function() {
//   alert("Module loaded (export default)!");
// }
let obj = await import('./say.js')
let say = obj.default
say()
