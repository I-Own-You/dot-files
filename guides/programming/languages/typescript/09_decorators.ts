// decortor - special kind of declaration that can be attached to:
//            class, method of class, accessor, property, paramter.
// @expression - expression is a function that will be called at runtime
//
// sealed is our decorated, target is the construction we attached to decorator
function sealed(target) {
  // do something with 'target' ...// do something with 'target' ...
}

// decorator factory - modifies the decoartor itself, by adding paramters or something else:
function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target) {
    // the decorator
    // we can do something with target and value
  };
}

// applying decoartors:
// @f @g x - on a single line
//
// @f
// @g
// x - on mulitple lines

// the evaluation is from top to bottom, but the execution of the decorator is bottom to top
function first() {
  console.log("1");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("4");
  };
}
function second() {
  console.log("2");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("3");
  };
}
class ExampleClass {
  @first()
  @second()
  method() {}
}
// the output would be:
1, 2, 3, 4;

// decorator evaluation in term of class:
//
// Parameter Decorators, followed by Method, Accessor,
// or Property Decorators are applied for each instance member.
//
// Parameter Decorators, followed by Method, Accessor,
// or Property Decorators are applied for each static member.
//
// Parameter Decorators are applied for the constructor.
// Class Decorators are applied for the class.

// class decorator:
//
// 1. is applied to the constructor of the class, it can observe, modify, repalce class definition
// 2. it cannot be used in a declaration file, or in ambient context
// 3. at runtime the decorator will be invoked as a funciton with only one argument, the class constructor
// 4. if class decorator returns a value,
//    it will replace the class declaration with the provided constructor function
function reportableClassDecorator<T extends new (...args: any[]) => {}>(
  constructor: T
) {
  return class extends constructor {
    reportingURL = "http://www...";
  };
}
@reportableClassDecorator
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}
const bug = new BugReport("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"
// error, class doesnt have this property, ts system doesnt know about it,
// so you either create it in class, or implement an interface that has it
bug.reportingURL;

// method decorator:
// 1. applies to property descriptor, can be used to observe, modify or replace method definiton
// 2. it cannot be used in a declaration file, or in ambient context
// 3. at runtime, the expression will be called with 3 arguments:
//    1. constructor function of the class for static member or
//       the prototype of the class for an instance member
//    2. the name of the member
//    3. the property descriptor for the member // if target is under es5, descriptor is undefined
//
// if method decorator returns a value,
// it will be used as the property descriptor for the method //undefined if target lower than es5
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}

// accessor decorators:
// 1. applies to the property descriptor that can observe, modify or replace accessor definiton
// 2. it cannot be used in a declaration file, or in ambient context
// 3. decorator must be set either to get or set, but not both,
//    because the decorator will apply to both descriptors
// at runtime, the expression will be called with 3 arguments:
//     1. constructor function of the class for static member or
//        the prototype of the class for an instance member
//     2. the name of the member
//     3. the property descriptor for the member // if target is under es5, descriptor is undefined
class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  @configurable(false)
  get x() {
    return this._x;
  }
  @configurable(false)
  get y() {
    return this._y;
  }
}
function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
  };
}
// property decorators:
// 1. it cannot be used in a declaration file, or in ambient context
// 2.return value of the paramter is ignored
// at runtime, the expression will be called with 3 arguments:
//     1. constructor function of the class for static member or
//        the prototype of the class for an instance member
//     2. the name of the member
//        @decorator_name
//        property_name: type

// parameter decorators:
// 1. applies to function for class constructor or method declaration
// 2. it cannot be used in a declaration file, or in ambient context
// 3. a paramter decorator can only observe that a paramter has been declared on a method
// 4. return value of the paramter is ignored
// at runtime, the expression will be called with 3 arguments:
//     1. constructor function of the class for static member or
//        the prototype of the class for an instance member
//     2. the name of the member
//     3. the ordinal index of the paramter in the functions paramater list
function a(@decorator_name var_name: type);
