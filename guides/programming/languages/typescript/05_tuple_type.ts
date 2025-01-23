// tuple type - sort of fixed array length with knwon types:
type StringNumberPair = [string, number];
//
function heyDoSomething(pair: [string, number]) {
  const a = pair[0]; // a = string
  const b = pair[1]; // b = number
}
heyDoSomething(["hello", 42]);

// you also cant access out of range like in other arrays, it will give you error:
function noDoSomething(pair: [string, number]) {
  const c = pair[2];
}

// we also can destructurize them
function adoSomething(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;
  console.log(inputString);
  console.log(hash);
}

// we also can have optional properties,
// and the length now wont be fix, it will be: length | length - 1
type Either2dOr3d = [number, number, number?];
function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord; // z = number | undefined
  console.log(`Provided coordinates had ${coord.length} dimensions`);
}

// tuples also have rest elements:
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
// an example of the same logic
function myReadButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
} // same as bellow
function noMyreadButtonInput(
  name: string,
  version: number,
  ...input: boolean[]
) {
  // ...
}

// tuples can also be readonly, they often arent modified, so its good to make them explicilty readonly
function nDoSomething(pair: readonly [string, number]) {
  // ...
}
// this means you cant modify them
function mDoSomething(pair: readonly [string, number]) {
  pair[0] = "hello!"; // error
}

// also, doesnt matter if the function changes or not the content,
// if a tuple is readonly, you cant pass it to a function that takes a tuple that is not readonly:
let myPoint = [3, 4] as const;
function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}
// erorr, point is readonly because of the 'as const', it infers automaticcaly readonly when used
distanceFromOrigin(myPoint);
