// when builing types, the interface is preferred, types are used when specific features are needed
// like building other types, union of types, .etc

// you can also specify that an attribute of the object is optional,
// but you will need to check for undefined\null if its optional
function printName(obj: { first: string; last?: string }) {
    // last?, (?)
    // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

// you can remove null/undefined type so no error will be
// (but only if you are sure that null/undefined wont be there):
function liveDangerously(x?: number | null) {
    console.log(x!.toFixed()); // x!, (!) so you dont have to narrow the check for null/undefined
}

// useful builtin interfaces: https://www.typescriptlang.org/docs/handbook/utility-types.html

// symbols in ts have some differences between js: https://www.typescriptlang.org/docs/handbook/symbols.html

// types in detail:
//  Object type - non primitive type, differnet from empty object {} or object,
//                and also different from global object Object, so use object instead of Object
//  void - its automatically infered if funciton returns nothing(return;) or
//         undefined(no return at all or return undefined).
//         its not the same as undefined thought.
//  unknown - like any but you cant do anything with a variable of unknown untill you declare a type on it
function safeParse(s: string): unknown {
    return JSON.parse(s);
}
const obj = safeParse(someRandomString); // you cant use it thought, untill you set a type on it
//  never - this type cant happen
//          (usually means the programm has terminated or thrown an error,
//          it also can happen if a union doesnt have options any more, in if/else for example)
function fail(msg: string): never {
    throw new Error(msg);
}
function fn(x: string | number) {
    if (typeof x === "string") {
        // do something
    } else if (typeof x === "number") {
        // do something else
    } else {
        x; // has type 'never'!
    }
}
// Function - global type Function, with properties like bind, call, apply and etc.
function doSomething(f: Function) {
    return f(1, 2, 3); // it has type return type of any, its not safe so () => void is safer
}

// keyof type operator produces a string or number of all keys of the object:
type Point = { x: number; y: number };
type P = keyof Point; // Point is same as 'x' | 'y'
// complex example
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
getProperty(x, "m"); // m key doesnt exist on x

// if a type has string or number signature, then keyof will return that type instead
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // A is of type number
//
type Mapish = { [k: string]: boolean };
// type of M here is string | number,
// because numeric keys are coercd to string in js, so objg[0] is same as obj['0']
type M = keyof Mapish;

// you can use typeof to create types also:
let s = "hello";
let n: typeof s; // n of type string
// you can use predefined type RerturnType to take a function type and return the return type:
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>; // K of type boolean
//
function f1() {
    return { x: 10, y: 3 };
}
type P1 = ReturnType<f1>; // error, f is not a function type, its a funciton itself
type PP = ReturnType<typeof f1>; // will work, P1 = { x: number, y:number }
// you can use typeof only on identifiers (like variable names, property names, etc)

// impicit coercion type, it lets you weak verify(==, !=) a value, and if its type is union,
// it can be both.
function check(value: string | number) {
    if (value == "42") {
        // value is string | number
    }
}

// const type parameters
//
// preserves literal types for stricter type safety
//
function createPair<const T extends string>(
    key: T,
    value: number,
): [T, number] {
    return [key, value];
}
const pair = createPair("hello", 42);
// pair inferred as ["hello", number]
//

// satisfies keyword
//
// ensures an object conforms to a type without altering its inferred type.
//
type Config2 = { id: number; name: string; extra: boolean }; // { id: number; name: string; extra: boolean }
const config = { id: 1, name: "Test", extra: true } satisfies Config2;

// linked this type
//
// improves chaining support by allowing this to refer to the current instance's type.
//
class Builder {
    private data: string[] = [];

    // return type is this
    add(item: string): this {
        this.data.push(item);
        return this;
    }

    build(): string {
        return this.data.join(", ");
    }
}

const builder = new Builder().add("one").add("two").build();
// Returns "one, two"

// using keyword
//
// provides resource management for objects with destructors (e.g., cleanup logic).
//
class Resource {
    dispose() {
        console.log("Resource disposed");
    }
}
function example() {
    using resource = new Resource();
    console.log("Using resource");
}
example();
// Resource is automatically disposed at the end of the scope.

// accessor keyword
//
// allows defining getters and setters with accessor, simplifying property definitions.
//
class User {
    accessor name: string; // ecmascript2015 required

    constructor(name: string) {
        this.name = name;
    }
}
const user = new User("Alice");
console.log(user.name); // "Alice"
user.name = "Bob";

// just so namings from ohter .ts file wont conflict
export {};
