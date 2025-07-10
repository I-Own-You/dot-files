// this way you can describe a function expression:
//
// the parameter is required, because if we would have (string) it would mean string: any
function myGreeter(fn: (a: string) => void) {
    fn("Hello, World");
}
function printToConsole(s: string) {
    console.log(s);
}
myGreeter(printToConsole);
// a type can be used to describe it also:
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
    // ...
}
// call signature, a way to describe a function that has property beside parameters:
type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}
function myFunc(someArg: number) {
    return someArg > 3;
}
myFunc.description = "default description";
doSomething(myFunc);

// construct signatures, you can create functions constructors with [new] keyword:
type SomeConstructor = {
    new (s: string): {};
};
function fn(ctor: SomeConstructor) {
    return new ctor("hello");
}

// just so namings from ohter .ts file wont conflict
export {};
