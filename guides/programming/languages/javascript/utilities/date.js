// Date - class to work with timezone and display date, date starts from 1 january 1970(unix timestamp)
const myCurrentDate = new Date('August 14, 2022 14:15:30')
console.log(myCurrentDate.getDay()) // 0
console.log(myCurrentDate.getHours()) // 14
console.log(myCurrentDate.getTime()) // 1660475730000
console.log(myCurrentDate.getFullYear()) // 2022
console.log(myCurrentDate.toISOString()) // 2022-08-14T11:15:30.000Z
//
currentDate.setMonth(0, 1)
console.log(currentDate.toLocaleDateString()) // 01.01.2022
//
const utcDate = new Date(Date.UTC(2022, 8, 14, 14, 15, 30))
console.log(utcDate.toISOString()) // 2022-09-14T14:15:30.000Z

// some useful methods:
// getFullYear() // year
// getMonth() //month, from 0 to 11
// getDate() //day, from 1 to 31
// getDay() //day, from 0 to 6
// getHours() //hours, form 0 to 23
// getMinutes() //minutes, from 0 to 59
// getSeconds() //seconds, from 0 to 59
// getMilliseconds() //milliseconds, from 0 to 999
// getTime() // returns milliseconds passed from unix timestamp
// getTimezoneOffset() // returns the difference between UTC and your current timezone in minutes
// setFullYear(y, m, d) sets the year, rest is opt
// setMonth(m, d) sets month, rest is opt
// setDate(d) sets day of the month
// setHours(h, m, s, ms) sets hours, rest is opt
// setMinutes(m, s, ms) - sets minutse, rest is opt
// setSeconds(s, ms) sets seconds, rest is opt
// setMilliseconds(ms) - sets ms
// setTime()  // sets milliseconds, starting from unix timestamp
//
// all this methods return the value for the current timezone.
// to use UTC, you must use UTC methods instead

// parsing a string as a date format:
console.log(Date.parse('2022-11-30T21:00:00.000Z')) // returns ms passed since unix timestamp
// 1669842000000

// to get a date in specific format you can use toLocaleDateString(locale, options):
const antoherCurrentDate = new Date('August 14, 2022 14:15:30')
const anotherOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'long',
}
console.log(currentDate.toLocaleDateString('ru-RU', options)) // 14.08.2022, 14:15:30
console.log(currentDate.toLocaleDateString('en-US', options)) // 8/14/2022, 2:15:30 PM

// you can get current time without creating a class object with
// Date.new() - returns ms passed from unix timestamp

// you can use math operation on dates,
// but you must use it on UTC dates, becuase only them take accountability of summer shift time:
const utcDateOne = new Date(Date.UTC(2022, 0, 1, 0, 0, 0))
const utcDateTwo = new Date(Date.UTC(2022, 11, 31, 0, 0, 0))
console.log(utcDateOne.toUTCString()) // Sat, 01 Jan 2022 00:00:00 GMT
console.log(utcDateTwo.toUTCString()) // Sat, 31 Dec 2022 00:00:00 GMT
const result = utcDateTwo - utcDateOne
console.log(result) // 31449600000 ms
console.log(result / (1000 * 60 * 60 * 24)) // 364

// Date class can autocorrect the input so if you put for example 32 for december,
// it will just add one day to 31 december(only 31 december can be, and it will become a new year then)

// instead of toLocaleDateString() you can use Intl.DateTimeFormat:
const currentDate = new Date('August 14, 2022 14:15:30')
const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'long',
}
console.log(new Intl.DateTimeFormat('ru-RU', options).format(currentDate)) // 14.08.2022, 14:15:30
console.log(new Intl.DateTimeFormat('en-US', options).format(currentDate)) // 8/14/2022, 2:15:30

// if Date class and Intl.DateTimeFormat() isnt enough, you can choose a library to work with dates
