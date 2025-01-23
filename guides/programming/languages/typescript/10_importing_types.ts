// modules:

// types can be exported with js syntax:
// @filename: animal.ts
export type Cat1 = { breed: string; yearOfBirth: number };
export interface Dog1 {
  breeds: string[];
  yearOfBirth: number;
}
// @filename: app.ts
import { Cat1, Dog1 } from "./animal.ts";
type Animals1 = Cat | Dog;

// if you use import type, then you cant use it as a value:
// @filename: animal.ts
export type Cat2 = { breed: string; yearOfBirth: number };
export type Dog2 = { breeds: string[]; yearOfBirth: number };
export const createCatName2 = () => "fluffy";
// @filename: valid.ts
import type { Cat2, Dog2 } from "./animal.js";
export type Animals2 = Cat | Dog;
// @filename: app.ts
import type { createCatName2 } from "./animal.js";
const name1 = createCatName2(); // error, createCatName was imported as a type

// you can also include type in {} to explicitly show that it is imported as a type, but others not:
// @filename: app.ts
import { createCatName, type Cat, type Dog } from "./animal.js";
export type Animals = Cat | Dog;
const name = createCatName();

// CommonJS syntax:
// Identifiers are exported via setting the exports property on a global called module:
function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
// importing it:
const maths = require("./maths");
maths.pi;
// or you can use the destructurizing method
const { squareTwo } = require("./maths");
squareTwo;
