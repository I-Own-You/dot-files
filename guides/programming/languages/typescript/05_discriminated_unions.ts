// discriminated unions:
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}
function myGetArea(shape: Shape): number | undefined {
  // error, radius could be undefined, we could put ! after it, but its not a good approach
  return Math.PI * shape.radius ** 2;
}
myGetArea({ kind: "circle" });
//
function myAgetArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2; // still error, narrowing doesnt help
  }
}
// new approach
interface Circle {
  kind: "circle";
  radius: number;
}
interface Square {
  kind: "square";
  sideLength: number;
}
type myShape = Circle | Square;
function mySgetArea(shape: myShape) {
  return Math.PI * shape.radius ** 2; // still error, because radius doesnt exist on Square
}
// but now
function yetGetArea(shape: myShape) {
  // because of this, now, kind is strictly an object that is circle instead of a previous 'union'.
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2; // works
  }
}
// both Circle and Square,
// because of the property kind(discriminant property now) now are considered a discriminated unions,
// and can narrow down the properties of it
//
// you can also use switch for this, it suits discriminant unions
function anotherGetArea(shape: myShape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // (parameter) shape: Circle
    case "square":
      return shape.sideLength ** 2; // (parameter) shape: Square
  }
}
// using never type, never can be assigned to every type, but not otherwise:
interface Triangle {
  kind: "triangle";
  sideLength: number;
}
type yetShape = Circle | Square | Triangle;
function getArea(shape: yetShape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      // it will cause an error, because Triangle type cant be never type
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
