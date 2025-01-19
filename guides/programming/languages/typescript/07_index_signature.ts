// index signature - a way to set the return type when accessing index of some type:
interface myStringArray {
  // means the return type must be string when we access an index number
  [index: string]: number;
  // error, because the index returns string
  // (i index would be of type number, and returned string, it would be ok,
  // because the return type of properties must be string or its subtype),
  // all property now should return string.
  // To make property return string or number you could use a unioin  [index: string]: number | string;
  length: string;
  age: number;
}
const mmyArray: myStringArray = getStringArray();
const secondItem = mmyArray[1]; // like here
// the types allowed for index signature is number, string, symbol, template string patterns,
// union types consisting of the earlier.
// index signatures can also be readonly, so you cant assign to them:
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = getReadOnlyStringArray();
myArray[2] = "Mallory"; // error
//
// we can also support more than one return type for index signature:
interface Dog {
  name: string;
}
interface heyAnimal extends Dog {
  breed: string;
}
interface NotOkay {
  // this works because the numeric type returned a type that is subtyped of a string
  [x: number]: heyAnimal;
  [x: string]: Dog;
  // this wouldn work
  // [x: number]: Dog  // error, Dog is not a subtype, its the parent for Animal
  // [x: string]: Animal
}
