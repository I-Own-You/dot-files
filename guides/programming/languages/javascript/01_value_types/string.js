const singleQuotesString = 'a'
// prettier-ignore
const doubleQuotesString = "b"
// the poinf of bakcticks is taht you can store multiline string, like below, the whitespace is preserved
const backTickString = `c
affdasfsdaasfdfsda
`

// you can access string symbols by index, it also has .length attribute
'asdf'.length
'fadfds'[0]
'dfadsf'[0] = '2' // its weird but it works, and returns the assigned part, "2", it wont mutate the string
// strings are immutable, as all primiteves are

// `` - backtick notation are special strings inside js, you can use js code inside it using `${}` notation
const someString = `${'abcd'.toUpperCase()}` // ABCD
const anotherString = `"'` // you can use ",' inside ``, without \ (escape sequence) as you would need with ",'
const preserveWhiteSpace = `fdsaasdff

fasdfsdasdf
adsfafdsdsaf` // newline will be preserved
const integrateSomeString = `${someString} + myText` // 'ABCD + myText'

// this is called [pattern functions],
// they are kind of strange but they let you access string and variables this way:
function loggerTag(strings, ...expressionValues) {
  console.log(strings)
  console.log(...expressionValues)
}
loggerTag`booleans are ${2} types: they are either ${true} or ${false}`
// ['booleans are ', ' types: they are either ', ' or ', '']
// 2 true false
