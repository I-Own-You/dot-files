// indexed access type - a way to look up a property of an object to set a type:
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; // Age is now of type number

// another examples using unions, keyof, type itself
type I12 = Person["age" | "name"]; // type I1 = string | number
type I2 = Person[keyof Person]; // type I2 = string | number | boolean
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName]; // type I3 = string | boolean
type I13 = Person["alve"]; // error, this property does not exist

// some constructions
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
type myPerson = (typeof MyArray)[number]; // Person { name: string; age: number; }
type myAge = (typeof MyArray)[number]["age"]; // type Age = number
type myAge2 = myPerson["age"]; //type Age2 = number
const key = "age";
type myAge3 = myPerson[key]; // error, cant use const literals for this
