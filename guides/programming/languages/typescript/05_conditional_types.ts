// conditional types
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
type Example1 = Dog extends Animal ? number : string; // type Example1 = number
type Example2 = RegExp extends Animal ? number : string; // type Example2 = string
// complex example
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}
// a lot of code could be done with conditional checking:
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
function createLabel2<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

// conditional type constraint:
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
interface Email {
  message: string;
}
interface Dog {
  bark(): void;
}
type EmailMessageContents = MessageOf<Email>; //type EmailMessageContents = string
type DogMessageContents = MessageOf<Dog>; //type DogMessageContents = never
// another exmaple of getting type of an array or leaving it
type Flatten<T> = T extends any[] ? T[number] : T; // [number] gets the type of the array elements
type Str = Flatten<string[]>; // type Str = string
type Num = Flatten<number>; //type Num = number

// we also can infer the type not in the true branch of conditional types but on the condition itself:
type myFlatten<Type> = Type extends Array<infer Item> ? Item : Type;
type myStr = Flatten<string[]>; // type Str = string
type myNum = Flatten<number>; //type Num = number
// complex example
// here Return is a new generic type that will be inferred as a return type for a function
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
// type Num = number
type sNum = GetReturnType<() => number>;
// type Str = string, also, the (x: string) works because of the STS,
// it actually looks at the function structre that looks at parameter types and return type,
// so return type can be grabbed in a conditional type, so it will pass
type sStr = GetReturnType<(x: string) => string>;
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>; //type Bools = boolean[]
// also with call signatures, inferring from them, infers the last signature type
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;
type T1 = ReturnType<typeof stringOrNum>; //type T1 = string | number

// distributive conditional types - when you pass a union to a conditional type that acts on generic type,
// it becomes a union itself:
type ToArray<Type> = Type extends any ? Type[] : never;
// type StrArrOrNumArr = string[] | number[]
type mStrArrOrNumArr = ToArray<string | number>;
// we can actually make a union then to assign it as a an array type:
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
// type StrArrOrNumArr = (string | number)[], so it means an array that can have either strings or numbers
type StrArrOrNumArr = ToArrayNonDist<string | number>;
