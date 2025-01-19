// generic type(can be anyting), <type>:
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

// you can declare your own type that uses generic:
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
declare const backpack: Backpack<string>;
// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get();
// Since the backpack variable is a string, you can't pass a number to the add function.
backpack.add(23);

// generic functions, generics usually means the connection between input/output,
// or the fact that you get one type, and return the same type:
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
const s = firstElement(["a", "b", "c"]);
const n = firstElement([1, 2, 3]);
const u = firstElement([]);
// map implementation for example, the Type was inferred by the ts automatically
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// generic paramter defualts:
declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
  element: T,
  children: U[]
): Container<T, U[]>; // a bunch of signatures with different possible ways of executing
// now lets give them default type paramters
declare function create<T extends HTMLElement = HTMLDivElement, U = T[]>(
  element?: T,
  children?: U
): Container<T, U>;
// const div: Container<HTMLDivElement, HTMLDivElement[]>
const div = create();
// const p: Container<HTMLParagraphElement, HTMLParagraphElement[]>
const p = create(new HTMLParagraphElement());
