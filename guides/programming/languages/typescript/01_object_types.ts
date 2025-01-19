// object types:
//
// we can define readonly properties that can be read, but cant be reassigned:
interface SomeType {
  readonly prop: string;
}
function myDoSomething(obj: SomeType) {
  console.log(`prop has the value '${obj.prop}'.`);
  obj.prop = "hello"; // error
}
// but with aliasing, we can reassign it:
interface Person {
  name: string;
  age: number;
}
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}
let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};
// it points now to antoher object that is modifiable, it works because the shape is the same
let readonlyPerson: ReadonlyPerson = writablePerson;
console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'

// another exmaple
type myObj = { hey: 2; kek: 2 };
const a: myObj = { hey: 2, kek: 2 };

// object literals have more checking under the hood for exmaple:
interface SquareConfig {
  color?: string;
  width?: number;
}
function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "rod",
    area: config.width ? config.width * config.width : 20,
  };
}
// error, 'colour' doesnt exist on SquareConfig
let hmySquare = createSquare({ colour: "rod", width: 100 });
// a workaround is using type assertion
// this works because at least 1 property is defined that exists in SquareConfig
let zmySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
let squareOptions = { colour: "rod", width: 100 };
// works because variable dont get checking like object literals,
// and also the variable object has at least 1 property that is defined in SquareConfig
let mySquare = createSquare(squareOptions);
// if you would want to let programmers know that it has other property for whatever reason you can do:
// [propName string]: any

// generic objects:
interface myBox<Type> {
  contents: Type;
}
let box: myBox<string>;
// Type can be substituted with anything so
interface yetBox<Type> {
  contents: Type;
}
interface Apple {
  // ....
}
type AppleBox = yetBox<Apple>; //{ contents: Apple }
// and also this
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}
