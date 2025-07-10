// you can use a type assertioin if you know you will get some kind of value,
// but the ts dont knwo about it:
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// also you can use the < > syntax, but not in .tsx
const myMyCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

// the type assertions are removed at compile time as type annotations so if the type assertion is wrong,
// there is no runtime checking, no error will be thrown or null generation

const x = "hello" as number; // string as number, error
