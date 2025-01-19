// while loop
while (Math.random() < 0.8) {
  console.log('not yet')
}

// do while
// it will execute the first time, the next time it will execute only if the condition is true
do {
  console.log('not yet')
} while (Math.random() < 0.8)

// for loop
for (let i = 0; i < 10; i++) {
  // let i = 0, initialization
  // i < 10, condition,
  // i++, step
  console.log(i)
}

for (let i = 10; i > 0; i -= 2) {
  console.log(i)
}

for (let i, j = 2; i + j < 50; i++, j++) {
  console.log(`i = ${i}; j = ${j}`)
}

// you can skip initialization and step to basically achhieve while loop
for (; Math.random() < 0.8; ) {
  // you can use break or continue to break out of loop or start the next iteratioin of the loop
  if (Math.random() > 0.5) {
    continue
  }
  if (Math.random() > 0.9) {
    break
  }
  console.log('not yet')
}

// dont use labels, they are confusing
// you can also label block of code and jump ot it,
//  but only if the label is above the execute of the jump:
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`(${i},${j})`, '')
    if (!input) break outer // (*)
  }
}
label: {
  // ...
  break label // work
  // ...
}

// for..in - iterate through attributes of an object that were explicitly assigned by a programmer,
// and if they are iterable, and also attributes from prototype and its chain
const cat = {
  name: 'a',
  color: 'redd',
  age: 8,
}
for (const key in cat) {
  console.log(`${key} – ${cat[key]}`)
}
// name – 'a',
// color – 'red',
// age – 8
//
// if you add an attribute while being in for..in, its not guaranateed that it will be in for..in
// if you delete an attribute while being in for..in, the for..in wont include that attribute
