// type aliases - a way to create an alias for a type with a different name:
type Point = {
    x: number;
    y: number;
};
function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 100, y: 100 });
// another example
type ID = number | string;
// another complex example
type UserInputSanitizedString = string;
function sanitizeInput(str: string): UserInputSanitizedString {
    return str.toLowerCase();
}
let userInput = sanitizeInput("ABS");
userInput = "new input"; // can still be string because the type alias itself points to a string type

// just so namings from ohter .ts file wont conflict
export {};
