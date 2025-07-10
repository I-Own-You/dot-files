// in ts, you can compose types by combining simple ones, there are 2 popular ways: unions and generics
//
// Union(you can declare that a type can be either something or another or .etc):
type MyBool = false | true;
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
function getLength(obj: string | string[]) {
    return obj.length;
}

// the operations on union types are allowed only if they work for all the types:
function printId(id: number | string) {
    // error, because .toUpperCase() is only available for string.
    //
    // so you must check with typeof === string,
    // for example, and there do this
    console.log(id.toUpperCase());
}
