// namespaces (like modules):
interface StringValidator {
    isAcceptable(s: string): boolean;
}
let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;
class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
        return lettersRegexp.test(s);
    }
}
class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
// Some samples to try
let astrings = ["Hello", "98052", "101"];
// Validators to use
let zvalidators: { [s: string]: StringValidator } = {};
zvalidators["ZIP code"] = new ZipCodeValidator();
zvalidators["Letters only"] = new LettersOnlyValidator();
// Show whether each string passed each validator
for (let s of astrings) {
    for (let name in zvalidators) {
        let isMatch = zvalidators[name].isAcceptable(s);
        console.log(
            `'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`,
        );
    }
}
// works fine, but as we expand, we need to give new names to not collide with the existent
// but we can have a builtin module that will keep it in a scope:
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;
    export class zLettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
    export class yZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
// Some samples to try
let strings1 = ["Hello", "98052", "101"];
// Validators to use
let evalidators: { [s: string]: Validation.StringValidator } = {};
evalidators["ZIP code"] = new Validation.yZipCodeValidator();
evalidators["Letters only"] = new Validation.zLettersOnlyValidator();
// Show whether each string passed each validator
for (let s of strings1) {
    for (let name in evalidators) {
        console.log(
            `"${s}" - ${
                evalidators[name].isAcceptable(s) ? "matches" : "does not match"
            } ${name}`,
        );
    }
}

// we can split them a cross file and combine into one:
//Validation.ts
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}
//LettersOnlyValidator.ts
/// <reference path="Validation.ts" />
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}
//ZipCodeValidator.ts
/// <reference path="Validation.ts" />
namespace Validation {
    const numberRegexp = /^[0-9]+$/;
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
//Tests.ts
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />
// Some samples to try
let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(
            `"${s}" - ${
                validators[name].isAcceptable(s) ? "matches" : "does not match"
            } ${name}`,
        );
    }
}
// now, we can combine them into one file with: tsc --outFile sample.js Test.ts
// or we can specify all files:
// tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts
//
// if we choose the per-file compilation, we would need to put all files in a script:
// <script src="Validation.js" type="text/javascript" />
// <script src="LettersOnlyValidator.js" type="text/javascript" />
// <script src="ZipCodeValidator.js" type="text/javascript" />
// <script src="Test.js" type="text/javascript" />

// we can aslo use aliases:
namespace Shapes {
    export namespace Polygons {
        export class Triangle {}
        export class Square {}
    }
}
import polygons = Shapes.Polygons; // its not common js modules, its just a syntax for namespace aliases
let sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'

// merging namespaces
namespace Animals {
    export class zZebra {}
}
namespace Animals {
    export interface Legged {
        numberOfLegs: number;
    }
    export class zDog {}
}
// non exported members are not visible to other namespaces/declarations:
namespace Animal {
    let haveMuscles = true;
    export function animalsHaveMuscles() {
        return haveMuscles;
    }
}
namespace Animal {
    export function doAnimalsHaveMuscles() {
        return haveMuscles; // Error, because haveMuscles is not accessible here
    }
}

// another example of non exported member
class Album {
    label: Album.AlbumLabel;
}
namespace Album {
    export class AlbumLabel {}
}
// function properties in a typescript way with namespaces instead of dot notation:
function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel {
    export let suffix = "";
    export let prefix = "Hello, ";
}
console.log(buildLabel("Sam Smith"));
// enums:
enum Color {
    ed = 1,
    reen = 2,
    lue = 4,
}
// not all merges are allowed:
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#disallowed-merges

// js doesnt support module merging, but its possible:
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation

// just so namings from ohter .ts file wont conflict
export {};
