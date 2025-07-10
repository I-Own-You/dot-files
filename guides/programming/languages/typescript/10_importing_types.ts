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
