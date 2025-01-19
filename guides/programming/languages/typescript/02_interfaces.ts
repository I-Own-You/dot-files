// interface - another way to name an object type
interface AnotherPoint {
  x: number;
  y: number;
}
function printOtherCoord(pt: AnotherPoint) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printOtherCoord({ x: 100, y: 100 });

// type and interface are very similar, almost every feature of interface are avaiable in type.
//
// the main difference is that type cant be reopened to add new properties, but interface can be extended
//
// extending interface:
interface MyAnimal {
  name: string;
}
interface MyBear extends MyAnimal {
  honey: boolean;
}
function getBear(): MyBear {
  return { honey: true, name: "hey" };
}
const myBear = getBear();
myBear.name;
myBear.honey;
// same as below
interface MyWindow {
  title: string;
}
interface MyWindow {
  c: string;
}

// we can extend types to cut down the boilerplate:
interface BasicAddress {
  name?: string;
}
interface AddressWithUnit {
  postalCode: string;
}
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
// {
//   name?: string;
//   postalCode: string;
//   unit: string;
// }
//
// you can extend from multiple interfaces as well:
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
interface aColorfulCircle extends Colorful, Circle {}
const cc: aColorfulCircle = {
  color: "rod",
  radius: 42,
};
//
// you can also use intersection to combine objects from interfaces:
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
type ColorfulCircle = Colorful & Circle;
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}
draw({ color: "boue", radius: 42 }); //ok
draw({ color: "rod", raidus: 42 }); //error
// the difference between interface extends and interface intersections is the handling of conflicts

// interfaces and types can also be generic:
interface cBox<Type> {
  contents: Type;
}
