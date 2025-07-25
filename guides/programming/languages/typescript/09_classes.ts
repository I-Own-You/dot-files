// classes:
class Point {
    // here is how you declare class variables (they are also obj properties)
    // the type is also any, its implicit if you dont define it
    a;
    b;
    // explicitly defined type
    c: number;
    // type is inferred from the value
    d: 0;
    //
    // --strictPropertyInitialization // with this option in tsconfig,
    // properties must be initialized with a value or initialized in the constructor
}
const pt = new Point();
pt.x = 0;
pt.y = 0;

// you can use the '!' modifier to not get an error if you have --strictPropertyInitialization set:
class OKGreeter {
    name!: string; // no error
}

// properties can have 'readonly' modifier,
// it means that property can be assigned value only in constructor:
class mGreeter {
    readonly name: string = "world";
    constructor(otherName?: string) {
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }
    err() {
        this.name = "not ok"; // error
    }
}
const gg = new mGreeter();
gg.name = "also not ok"; // error

// constructors in class are similar to funcitons so you can do what you do with
// functions but there are some limitations:
//
// 1. you cant have generic constructors
// 2. you cant have a return type

// constructors can be overloaded:
class myPoint {
    constructor(x: number, y: string);
    constructor(s: string);
    constructor(xs: any, y?: any) {
        // TBD
    }
}

// methods in a class are the same as in js, nothing new

// get/set is the same but with some differences:
// if get exists, and set not, the property becomes readonly
// if type of value in set is not specified, it is inferred from the return type of get
//
// get and set must have the same visibility member (public, protected, .etc)

// classes can have index signatures, but its not that common and not really useful:
class mMyClass {
    [s: string]: boolean | ((s: string) => boolean);
    check(s: string) {
        return this[s] as boolean;
    }
}
const myInstance = new mMyClass();
myInstance.property1 = true;
myInstance.property2 = (str) => str === "test";

// classes can implement interfaces:
interface Pingable {
    ping(): void;
}
class Sonar implements Pingable {
    ping() {
        console.log("ping!");
    }
}
class Ball implements Pingable {
    pong() {
        // error
        console.log("pong!");
    }
}

// classes can also implement more than one interface like: class A implements B, C, n {}
// implements clause doesnt change the class type, it only checks if class can be treated as an interface:
interface Checkable {
    check(name: string): boolean;
}
class NameChecker implements Checkable {
    // also, creating a property with '?' optionality, doesnt create that property in class,
    // it just makes the variable be undefined as an option beside its value type.
    //
    // accessing it wihout initializing will result in an error.
    myVar?: string;

    check(s) {
        return s.toLowerCase() === "ok"; // no error, becasue class is still a class
    }
}

// if target is es2022, or useDefineForClassFields = true,
// class fields are initialized after the parent class constructor completes,
// overwritting any value that parent class set.
//
// it can be bad if we only want to change the type of the property,
// so we can use 'declare' keyword to achieve that:
interface Animal {
    dateOfBirth: any;
}
interface Dog extends Animal {
    breed: any;
}
class AnimalHouse {
    resident: Animal;
    constructor(animal: Animal) {
        this.resident = animal;
    }
}
class DogHouse extends AnimalHouse {
    // resident is now Dog, but didnt change the value that constructor from parent class set
    declare resident: Dog;
    constructor(dog: Dog) {
        super(dog);
    }
}

// inheriting the builtin classes is tricky:
// https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types

// member visiblity - you can make a property/method public/protected/private:
//
// public - can be accessed anywhere, its the default one, just an explicit way of defining
class aGreeter {
    public greet() {
        console.log("hi!");
    }
}
const zg = new aGreeter();
zg.greet();
//
// protected - only visibly to subclasses and the class itself:
class Greeter {
    public greet() {
        console.log("Hello, " + this.getName());
    }
    protected getName() {
        return "hi";
    }
}
class eSpecialGreeter extends Greeter {
    public howdy() {
        console.log("Howdy, " + this.getName());
    }
}
const eg = new eSpecialGreeter();
eg.greet(); // OK
eg.getName(); // error, its protected
// but if we redefine the variable in the subclass without the protected modifier,
// it becomes public, so be aware:
class mBase {
    protected m = 10;
}
class aDerived extends mBase {
    m = 15;
}
const dd = new aDerived();
console.log(dd.m); // OK
// also, we cant access a protected method thorugh a base class:
class zBase {
    protected x: number = 1;
}
class Derived1 extends zBase {
    protected x: number = 5;
}
class Derived2 extends zBase {
    f1(other: Derived2) {
        other.x = 10;
    }
    f2(other: Derived1) {
        // error,
        // Derived1.x can be accessed only within Derived1 and its subclasses, Derived2 isnt one of them.
        other.x = 10;
    }
}
// private - accessed only within its class
// we can access the private properties of different objects of the same class:
class A {
    private x = 10;
    public sameAs(other: A) {
        return other.x === this.x; // no error
    }
}

// protected and private modifiers are enforced only on type checking,
// so in js runtime, we can still access them:
class MySafe {
    private secretKey = 12345;
}
const s = new MySafe();
// here error
console.log(s.secretKey);
// private property can be accessed with ['property'],
// so its kind of more 'soft private' than actually private:
console.log(s["secretKey"]); // no error

// but you can use '#' notation from js, to enforce hard private, they dont allow ['property'] accessing.
//
// if js is compiled in es2021 or less, then WeakMaps are used instead of '#' modifier:
// bear in mind that by adding different mechanism for private fields,
// like closures, WeakMaps, private fields, it affects performance

// static members of class can also have visibility modifiers:
class zMyClass {
    static x = 0;
    static printX() {
        console.log(zMyClass.x);
    }
}
console.log(zMyClass.x);
zMyClass.printX();
// static members are also inherited:
class eBase {
    static getGreeting() {
        return "Hello world";
    }
}
class cDerived extends eBase {
    myGreeting = cDerived.getGreeting();
}
// you cant use some static names that are builtin,
// classes themselves are Functions that can be invoked with new:
class S {
    static name = "S!"; // error
}
// you can have static blocks of code inside a class,
// where you can use private static fields:
class Foo {
    static #count = 0;
    get count() {
        return Foo.#count;
    }
    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        } catch {}
    }
}

// classes can use generic and all its funcitonality as well:
class zBox<Type> {
    contents: Type;
    constructor(value: Type) {
        this.contents = value;
    }
}
const b = new zBox("hello!");

// static member cannot refer to a generic type:
class rBox<Type> {
    // error, because at runtime types are erased,
    // and if we would have Box<string> and Box<number> as well, changing one, changes another
    static defaultValue: Type;
}
//
// this at runtime:
class yMyClass {
    name = "MyClass";
    getName() {
        return this.name;
    }
}
const cc = new yMyClass();
const obj = {
    name: "obj",
    getName: cc.getName,
};
console.log(obj.getName()); // obj, because this bind to the scope within it was called
// to fix this, we have to call arrow functions
class kMyClass {
    name = "MyClass";
    getName = () => {
        return this.name;
    };
}
const ccc = new kMyClass();
const ge = ccc.getName;
console.log(ge()); // MyClass, now its correct, but it has some notes
// 1. this will be correct even for code that ts didnt chec
// 2. this will use more memory because each class instance will have a copy of function
// 3. you cant use super.getName in a child class because there is no entry for base class to fetch from

// paramter properties - a way to define properties inside a constructor and not in class,
//                       by assigning at least one of the modifiers (readonly, public, protected, private):
class Params {
    constructor(
        public readonly x: number,
        protected y: number,
        private z: number,
        readonly h: number,
    ) {} // you dont need a body either
}
const a = new Params(1, 2, 3, 5);
console.log(a.x); // no error
console.log(a.z); // error

// class expressions, they dont need a name, but you can put it if you want:
const someClass = class<Type> {
    content: Type;
    constructor(value: Type) {
        this.content = value;
    }
};
const m = new someClass("Hello, world");

// constructor signatures, using a utility type like InstanceTyp< >,
// you can assign a class type, without creating an object with new
class tPoint {
    createdAt: number;
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.createdAt = Date.now();
        this.x = x;
        this.y = y;
    }
}
type PointInstance = InstanceType<typeof tPoint>;
function moveRight(point: PointInstance) {
    point.x += 5;
}
const point = new tPoint(3, 4);
moveRight(point);
point.x; // => 8

// classes, methods, fields can be abstract.
// 1. an abstract field or method must be in an abstract class that cant be instanciated,
//    they simply dont have an implementation
// 2. an abstract class serve as a base class for subclasses which will implement all the abstract members
// 3. if a class doesnt have abstract members, its called 'concrete class'
abstract class Base {
    abstract getName(): string;
    printName() {
        console.log("Hello, " + this.getName());
    }
}
const b2 = new Base(); // error, we cant initialize this class
// now with a derived class
class Derived extends Base {
    getName() {
        // if we would not implment it, we would get an error
        return "world";
    }
}
const d = new Derived();
d.printName(); // we also can access the non abstract method

// realtionship between classes, the classes are compared structurally:
class Point1 {
    x = 0;
    y = 0;
}
class Point2 {
    x = 0;
    y = 0;
}
const p1: Point1 = new Point2(); // no error, STS works
// subtype realtions also work:
class Person {
    name: string;
    age: number;
}
class Employee {
    name: string;
    age: number;
    salary: number;
}
const p: Person = new Employee(); // work, because Employee() has all the properties needed for Person
// also, an empty class has no members, its considered a supertype of everything, so be aware:
class Empty {}
function fn(x: Empty) {
    // can't do anything with 'x', so I won't
}
fn(window); //ok
fn({}); //ok
fn(fn); //ok

// generic classes:
class GenericNumber<NumType> {
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
// class types in generics:
function create<Type>(c: { new (): Type }): Type {
    return new c();
}
//
class BeeKeeper {
    hasMask: boolean = true;
}
class ZooKeeper {
    nametag: string = "Mikle";
}
class Animal {
    numLegs: number = 4;
}
class Bee extends Animal {
    numLegs = 6;
    keeper: BeeKeeper = new BeeKeeper();
}
class Lion extends Animal {
    keeper: ZooKeeper = new ZooKeeper();
}
function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

// just so namings from ohter .ts file wont conflict
export {};
