// constraining a type:
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    // we could want to return { length: 5},
    // but we cant, because here, we must return the Type we recieved
    return b;
  }
}
const longerArray = longest([1, 2], [1, 2, 3]);
const longerString = longest("alice", "bob");
const notOK = longest(10, 100); // error, number doesnt have .length property

// manually specifying a type:
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
// error, the return type Type[] would be number[] but we got .concat and now we have numbers and strings
const fArr = combine([1, 2, 3], ["hello"]);
// manually specifying that it can have number or string
const sArr = combine<string | number>([1, 2, 3], ["hello"]);
