// regexp work through RegExp and they are also integrated into string methods
regexp = new RegExp('patterns', 'flags')
or
// same object RegExp,
// the difference is, in /.../ you cant put variables, so its static, and not dynamic,
// its when we surely now what regexp we want
regexp = /pattern/
// smae object as RegExp, the difference is, in /.../ you cant put variables ,
// its when we surely now what regexp we want
regexp = /pattern/gim

// flags -  (there are others)
// i - case insensitive
// g - search for all occurences
// m - multi line regim
// s - 'dotall' regim where '.' can be \n symbol
// u - turn on full unicode support
// y - regime of searching where you can search on specific place in the string
// d - the result of a regexp is put into an array,
//     that has more info about the regexp beside regexp one

// some examples of regexp methods(they return an object with different useful attributes):
let someStr = 'Hello, amigo, hello!'
alert(someStr.match(/hello/gi)) // array of 2 values: Hello,hello

// .match() method returns null if no matches occur

// .replace()
alert('We will, we will'.replace(/we/i, 'I')) // I will, we will
alert('We will, we will'.replace(/we/gi, 'I')) // I will, I will

// there are special symbols also:
// $&	puts all the found occurence
// $`	puts data untill occurence
// $'	puts data after ocurence
// $n	if n is 1-2 length value, puts the data of n-th () group of the regexp
// $<name>	puts the data of () group with the name $<name>
// $$	inserts the $ symbol
//
// example:
// alert( "like HTML".replace(/HTML/, "$& and JavaScript") ); // Люблю HTML и JavaScript

// regexp.test() tests if there is at least 1 match:
let myStr = 'I like javascript'
let myRegexp = /like/i
alert(myRegexp.test(myStr)) // true

// class symbols(just a few of them):
// \d – digits.
// \D – non digits.
// \s – spaces, tabs, new lines
// \S – everythin except \s
// \w – latin symbols, digits, underscore '_'.
// \W – everythin except \w
// . – every symbol but except \n, but if flag \s is present, then \n becomes '.' as well

// some examples:
let numStr = '+7(903)-123-45-67'
let numRegExp = /\d/
alert(numStr.match(numRegExp)) // 7
//
let allNumStr = '+7(903)-123-45-67'
let allNUmRegexp = /\d/g
alert(allNumStr.match(allNUmRegexp)) // 7,9,0,3,1,2,3,4,5,6,7
alert(allNumStr.match(allNUmRegexp).join('')) // 79031234567
//
let strStr = 'is it CSS4?'
let strRegExp = /CSS\d/
alert(strStr.match(strRegExp)) // CSS4
//
alert('I love HTML5!'.match(/\s\w\w\w\w\d/)) // ' HTML5'
//
let anotherNumStr = '+7(903)-123-45-67'
alert(anotherNumStr.replace(/\D/g, '')) // 79031234567
//
alert('asdfw'.match(/./)) // a
//
let dotRegexp = /CS.4/
alert('CSS4'.match(dotRegexp)) // CSS4
alert('CS-4'.match(dotRegexp)) // CS-4
alert('CS 4'.match(dotRegexp)) // CS 4
//
alert('CS4'.match(/CS.4/)) // null(because '.' means anything, not nothing)
//
alert('A\nB'.match(/A.B/)) // null
alert('A\nB'.match(/A.B/s)) // A\nB
//
alert('1 - 5'.match(/\d-\d/)) // null
alert('1 - 5'.match(/\d - \d/)) // 1 - 5
alert('1 - 5'.match(/\d\s-\s\d/)) // 1 - 5

// flag and \p class can be used when you need unicode symbols
let falgREgexp = /\p{Sc}\d/gu
let flagSTr = `prices: $2, €1, ¥9`
alert(flagSTr.match(falgREgexp)) // $2,€1,¥9

// ^ and $ checks weather it starts or ends with the specified text:
let yetStr = 'Mary had a little lamb'
alert(/^Mary/.test(yetStr)) // true
let anotherYetStr = "it's fleece was white as snow"
alert(/snow$/.test(anotherYetStr)) // true

// there are methods endsWith and startsWith that will check this as well,
// regular expressions are used when a more complex logic is needed

// flag m, is used to affect the ^ and $,
// now ^ means the start of the line but also start of the line of all text, $ as well
let exampleStr = `1st place: hello
    2st place: hi
    3st place: ho`
console.log(exampleStr.match(/^\d/gm)) // 1, 2, 3
console.log(exampleStr.match(/^\d/g)) // 1
//
let backSttr = `hello: 1
    hi: 2
    ho: 3`
console.log(backSttr.match(/\d$/gm)) // 1,2,3
//
let anotherBAckstr = `hello: 1
    hi: 2
    ho: 3`
console.log(anotherBAckstr.match(/\d\n/g)) // 1\n,2\n
// so, the multiline regime where ^ and $ works, means that the next line(and every) is when \n comes

// boundaries of a word with \b pattern:
alert('Hello, Java!'.match(/\bJava\b/)) // Java
alert('Hello, JavaScript!'.match(/\bJava\b/)) // null
//
alert('1 23 456 78'.match(/\b\d\d\b/g)) // 23,78
alert('12,34,56'.match(/\b\d\d\b/g)) // 12,34,56
// the finding works like this: the start of a word must be \w, after it must be \w or not,
// and the ending of the word must be \w

// special symbols for surplus complexity: [ ] \ ^ $ . | ? * + ( )
// some exaples:
alert('book 5.1'.match(/\d\.\d/)) // 5.1
alert('book 511'.match(/\d\.\d/)) // null
//
alert('function g()'.match(/g\(\)/)) // "g()"
//
alert('1\\2'.match(/\\/)) // '\'
//
// '/', you only need to '\/' only if you use /***/ regexp, but not new RegExp()
alert('/'.match(/\//))

// new RegExp eats the '\' symbol in the string, so you must double it:
let regexpExp = new RegExp('d.d')
alert('Глава 5.1'.match(regexpExp)) // null
// do this instead
let regStr = '\\d\\.\\d'
alert(regStr) // \d\.\d
let anotherRegexp = new RegExp(regStr)
alert('Глава 5.1'.match(anotherRegexp)) // 5.1

// set of chars to choose from []:
alert('Hello Hylla'.match(/[ey]l/gi)) // "el", "yl"
// so, it basically means, find e and l, or find y and l
//
// ranges [n-n]:
alert('Exception 0xAF'.match(/x[0-9A-F][0-9A-F]/g)) // xAF
//
// you can also include class symbols, [\w\s] and other ranges
//
// ranges that exclude, like [^abcde]:
alert('alice15@gmail.com'.match(/[^\d\sA-Z]/gi)) // @ и .
//
// you can also include special symbols and not exclude them with \:
// . + ( ) - without \ in the []
// '-' - without \ if its at the start\end in the []
// ^ - without if its not at the start in the []
// ] - only with \ in the []
//
// but you can still exlude them with \, it wont harm the program
//
// examples:
let exclREg = /[-().^+]/g
alert('1 + 2 - 3'.match(exclREg)) // +
let exclOtherReg = /[\-\(\)\.\^\+]/g
alert('1 + 2 - 3'.match(exclOtherReg)) // +, -

// Quantifires - search for multiple symbols, class symbols, [] groups with {n}:
alert('i have 12345 years'.match(/\d{5}/)) //  "12345"
// we can also find {n, m} at least n till m included:
alert('i dont have 12, a 1234 years'.match(/\d{3,5}/)) // "1234"
// we can also find {n, } at least n untill infinity:
alert('i dont have 12, a 345678 years'.match(/\d{3,}/)) // "345678"
// example:
let quantSTr = '+7(903)-123-45-67'
let numbers = quantSTr.match(/\d{1,}/g)
alert(numbers) // 7,903,123,45,67

// + same as {1,}:
let arrStr = '+7(903)-123-45-67'
alert(arrStr.match(/\d+/g)) // 7,903,123,45,67
//, ? same as {0, 1}:
let questStr = 'color or colour'
alert(questStr.match(/colou?r/g)) // color, colour
//, * same as {0,}
alert('100 10 1'.match(/\d0*/g)) // 100, 10, 1
// weak quantifiers, so by putting '?' in front of a qunatifier,
// even ? itself, will become weak quantifier:
let weakQuantReg = /".+"/g
let weakQuantSTr = 'a "witch" and her "broom" is one'
// "witch" and her "broom", so this is not what we want,
// it basically goes to the end of the text becaue of the .+,
// and then shifts one symbol backward till " is found
// now with ?
alert(weakQuantSTr.match(weakQuantReg))
let questReg = /".+?"/g
let quetString = 'a "witch" and her "broom" is one'
alert(quetString.match(questReg)) // witch, broom
//
alert('123 456'.match(/\d+ \d+?/)) // 123 4alert( "123 456".match(/\d+ \d+?/) ); // 123 4
// so basically, it checks if \d fulfilled its duty, if yes, the search is over
// mainly its done for optimization, because the default search is greedy
// it can also be done with grouping []
let brackREg = /"[^"]+"/g
let brackStr = 'a "witch" and her "broom" is one'
alert(brackStr.match(brackREg)) // witch, broom

// groups with (), can help to use quantifiers on a whole group:
alert('Gogogo now!'.match(/(go)+/gi)) // "Gogogo"
// groups can be nested:
let nestStr = '<span class="my">'
let nestReg = /<(([a-z]+)\s*([^>]*))>/
let nestRes = nestStr.match(nestReg)
alert(nestRes[0]) // <span class="my">
alert(nestRes[1]) // span class="my"
alert(nestRes[2]) // span
alert(nestRes[3]) // class="my"
// if () are not required, '?' used on them for example,
// they will be anyway in the array of results, but undefined:
let grMatch = 'a'.match(/a(z)?(c)?/)
alert(grMatch.length) // 3
alert(grMatch[0]) // a
alert(grMatch[1]) // undefined
alert(grMatch[2]) // undefined
//
let match = 'ac'.match(/a(z)?(c)?/)
alert(match.length) // 4
alert(match[1]) // ac
alert(match[2]) // undefined
alert(match[3]) // c
//
const grStr = '<h1> <h2>'
const tags = grStr.match(/<(.*?)>/g)
console.log(tags) // <h1>, <h2>
// matchAll() can be used also, to find all occurences
let matchREs = '<h1> <h2>'.matchAll(/<(.*?)>/gi)
alert(matchREs) // [object RegExp String Iterator]
alert(matchREs[0]) // undefined (*)
matchREs = Array.from(matchREs)
alert(matchREs[0]) // <h1>,h1
alert(matchREs[1]) // <h2>,h2
// you could also use for..of instead of Array.from
// or even let [a, b] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
// matchAll() doesnt seek all occurences, it searches for n times we ask,
// so for example it has 1k occurences,
// but we had a for of 10, so it gave us 10 search/occurences and the ohter were not searched
//
// named groups:
let myDateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/
let myStr2 = '2019-04-30'
let groups = str.match(dateRegexp).groups
alert(groups.year) // 2019
alert(groups.month) // 04
alert(groups.day) // 30
// a more complex example
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g
let anotherMyStr = '2019-10-30 2020-01-01'
let results = anotherMyStr.matchAll(dateRegexp)
for (let result of results) {
  let { year, month, day } = result.groups
  alert(`${day}.${month}.${year}`)
  //  30.10.2019
  //  01.01.2020
}
// we can replace text with groups with $n:
let textGrStr = 'John Bull'
let testReg = /(\w+) (\w+)/
alert(textGrStr.replace(testReg, '$2, $1')) // Bull, John
// for named groups it will be like this
let namedgrReg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g
let namedStr = '2019-10-30, 2020-01-01'
alert(namedStr.replace(namedgrReg, '$<day>.$<month>.$<year>')) // 30.10.2019, 01.01.2020
// we can exclude a group from the result array as group name and group number with ?:
let exclNamStr = 'Gogogo John!'
let exclRegNamed = /(?:go)+ (\w+)/i
let result = exclNamStr.match(exclRegNamed)
alert(result[0]) // Gogogo John
alert(result[1]) // John
alert(result.length) // 2
// we can call the data from the first found group again by \n:
let weCanStr = `He said: "She's the one!".`
// here, the first group will find ', and then \1 will address to ',
// as well, \2 will address to the next group, that is ", and so on
let weCanReg = /(['"])(.*?)\1/g
alert(weCanStr.match(weCanReg)) // "She's the one!"
// to call the data from the first found group and all others, we can call the name of it with \k<name>:
let toStr = `He said: "She's the one!".`
let toReg = /(?<quote>['"])(.*?)\k<quote>/g
alert(toStr.match(toReg)) // "She's the one!

// logical OR in regexp with |:
let orREg = /html|css|java(script)?/gi
let orStr = 'we have found the Java, then HTML, then JavaScript'
alert(orStr.match(orREg)) // Java,HTML,JavaScript
//its more powerful then [] group, it can be used with () and so on

// lookahead assertion ?=:
let lookStr = '1 индейка стоит 30€'
// 30, it checks for \d+, if found, then checks if € goes after it, if goes, then \d+ is found,
// and returns it, the value checked is not included
alert(lookStr.match(/\d+(?=€)/))
// negative lookahead assertion ?!:
let negStr = '2 индейки стоят 60€'
alert(negStr.match(/\d+(?!€)/)) // 2, now it will look that € doesnt go after the \d+
// lookbehind assertion:
let lobStr = '1 индейка стоит $30'
alert(lobStr.match(/(?<=\$)\d+/)) // 30, now it looked for the \d+, and checked that before it, goes ? symbol
// negative lookbehind assertion:
let negLStr = '2 индейки стоят $60'
alert(negLStr.match(/(?<!\$)\d+/)) // 2, now it looked that before \d+ there is not $ symbol
// the lookahead/lookbehind assertion are not captured, but we can capture it if we put it in ():
let lbhStr = '1 индейка стоит 30€'
let lbhReg = /\d+(?=(€|kr))/
alert(lbhStr.match(lbhReg)) // 30, €

// some operations take long time because of human factor such as like (\d+)* and .etc,
// so take time to examine and be more specific to not get a lot of results
