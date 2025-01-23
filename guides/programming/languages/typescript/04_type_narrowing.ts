// type guard - a way to provide a type checking: typeof, instanceof, in

// narrowing - a way to get a type more precisely

// you could use in keyword to narrow a check as with if/esle:
type myFish = { swim: () => void };
type myBird = { fly: () => void };
function myMove(animal: myFish | myBird) {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}
//
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal; // (parameter) animal: Fish | Human
  } else {
    animal; // (parameter) animal: Bird | Human
  }
}

// based on control flow analysis, ts can narrow the type at some point, or regain them again:
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    // here, the type is only number, so string is left
    return " ".repeat(padding) + input;
  }
  // here type is only string, number is left
  return padding + input;
}
//another complex example:
function example() {
  let myX: string | number | boolean;
  myX = Math.random() < 0.5;
  // x: boolean
  console.log(myX);
  if (Math.random() < 0.5) {
    // x: string;
    myX = "hello";
    console.log(myX);
  } else {
    // x: number
    myX = 100;
    console.log(myX);
  }
  // x: string | number;
  return myX;
}
