// enums - not a type lvl extension of ts.
//
// you can define a set of named constants. they can be string or number type

// numreic enums:
enum mDirection {
  // the lower constants will be auto incremented,
  // if we would left the variable without any value,
  // it would be 0 and the rest would be auto incremented
  Up = 1,
  Down, // 2
  Left, // 3
  Right, // 4
}

// using enums:
enum UserResponse {
  No = 0,
  Yes = 1,
}
function respond(recipient: string, message: UserResponse): void {
  // ...
}
respond("Princess Caroline", UserResponse.Yes); // you can access it through '.'

// you can mix the type in an enum, but empty variables must be at the top, or after a numberic variable:
enum E {
  A = getSomeValue(),
  B, // error, or give it a value, or define a new variable above it with a number
}

// string enums:
enum zDirection {
  Up = "UP", // they must have a string literal or another string enum as its value, empty is not allowed
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// computed and constant members:
//
// an enum member is a constant if:
//     1. It is the first member in the enum and it has no initializer,
//        in which case it’s assigned the value 0
//     2. It does not have an initializer and the preceding enum member was a numeric constant.
//     3. The enum member is initialized with a constant enum expression.
//        (subset of ts expression that can be evaluated at compile time):
//        1.a literal enum expression (basically a string literal or a numeric literal)
//        2. a reference to previously defined constant enum member
//           (which can originate from a different enum)
//        3. a parenthesized constant enum expression
//        4. one of the +, -, ~ unary operators applied to constant enum expression
//        5. +, -, *, /, %, <<, >>, >>>, &, |, ^
//           binary operators with constant enum expressions as operands

// if value of an enum member is evaluated to NaN or Infinity - it is considered a compile time error

// Union enums and enum member types:
enum ShapeKind {
  Circle, // member becomes type itself
  Square, // member becomes type itself
}
interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}
interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}
let c: Circle = {
  kind: ShapeKind.Square, // error,
  radius: 100,
};

// enums are real objects at runtime:
enum E {
  X,
  Y,
  Z,
}
function f(obj: { X: number }) {
  return obj.X;
}
f(E);

// the enum itself as a type
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}
type LogLevelStrings = keyof typeof LogLevel; // 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

// reverse mappings (only for numeric enums):
enum rEnum {
  A1,
}
let a = rEnum.A1;
let nameOfA = rEnum[a]; // "A"

// const enums:
const enum zEnum {
  A = 1,
  B = A * 2,
}
const enum bDirection {
  Up,
  Down,
  Left,
  Right,
}
let zdirections = [
  bDirection.Up,
  bDirection.Down,
  bDirection.Left,
  bDirection.Right,
];
// generated code will be:
("use strict");
let directions = [
  0 /* Direction.Up */, 1 /* Direction.Down */, 2 /* Direction.Left */,
  3 /* Direction.Right */,
];
// 1. const enums can only use constant enum expressions(no computed values),
// 2. and they are removed during compile time, unlike regular enums that are kept as objects
// 3. const enum have some pitfalls: https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls
// 4. do not use const enums at all for no problems with them

// ambient enums (they describe the shape of already existing enum types):
declare enum Enum {
  A = 1,
  // the difference is here, if a member doesnt have a value,
  // it is considered always computed,
  // unlike in regular enums where it is constant if the preciding member is constant.
  // if its constant and ambient, then this rule doesnt apply
  B,
  C = 2,
}

// objects vs enums(you dont need enums in modern ts, you can use 'as const' easiy):
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

function walk(dir: EDirection) {}

type Direction = (typeof ODirection)[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);

// variable of some enum type cant be assigned to another enum type
