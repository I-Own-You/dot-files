// extending type via intersections:
type Animal = {
  name: string;
};
type Bear = Animal & {
  honey: boolean;
};
function getBear(): Bear {
  return { honey: true, name: "hey" };
}
const bear = getBear();
bear.name;
bear.honey;

// types can also be generic:
type dBox<Type> = {
  contents: Type;
};

// also madness like this is possible
type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
// type OneOrManyOrNull<Type> = OneOrMany<Type> | null
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
// type OneOrManyOrNullStrings = OneOrMany<string> | null
//
// string[], number[] and all others are just shorthands for Array<Type> like Array<string>.
// Array itslef is a generic interface

// as with generic types in general, there are 2 ways to pass a type:
function noIdentity<Type>(arg: Type): Type {
  return arg;
}
// in < >
let noOutput = noIdentity<string>("myString");
// or let the compiler infer the type,
// but be aware that compiler wont infer it everytime, so you will need to provide it sometimes
let output = noIdentity("myString");
// here are some exmaples of defining the type of our function
let myIdentity: <Type>(arg: Type) => Type = noIdentity;
// this works because remember that { } describes only the shape
let myWhatIdentity: { <Type>(arg: Type): Type } = noIdentity;
