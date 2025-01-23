// decorators are a way to customize the functionality of:
// class, class property, class method, class aaccessor, class method parameter

// just an example, it doenst work
//
// function simpleDecorator() {
//   console.log('---hi I am a decorator---')
// }

// @simpleDecorator
// class A {}

// just an example, it doenst work
//
// @classDecorator
// class Bird {
//   @propertyDecorator
//   name: string;
//
//   @methodDecorator
//   fly(
//     @parameterDecorator
//       meters: number
//   ) {}
//
//   @accessorDecorator
//   get egg() {}
// }

function decoratorF(C) {
  console.log("apply decorator");
  return C;
}
@decoratorF
class ItsMyClass {}
// applay decorator will be logged when class when decorator will apply to it,
// first, ItsMyClass is passed as C to decoratorF,
// then its modified(kind of),to print "apply decorator",
// then class ItsMyClass is returned.
//
// note that we didnt even initialize the class, const myVar = new ItsMyClass()

// order of evaluation
//
// the evaluation order of different types of decorators is well-defined:
//
// 1. parameter decorators, followed by method, accessor, or
//    property decorators are applied for each instance member.
//
// 2. parameter decorators, followed by method, accessor, or
//    property decorators are applied for each static member.
//
// 3. parameter decorators are applied for the constructor.
//    class decorators are applied for the class.
function f(key: string): any {
  console.log("evaluate: ", key);
  return function () {
    console.log("call: ", key);
  };
}
//
@f("Class Decorator")
class C {
  @f("Static Property")
  static prop?: number;

  @f("Static Method")
  static method(@f("Static Method Parameter") foo) {}

  constructor(@f("Constructor Parameter") foo) {}

  @f("Instance Method")
  method(@f("Instance Method Parameter") foo) {}

  @f("Instance Property")
  prop?: number;
}
//
// the code above will print the following messages:
//
// 1. evaluate:  Instance Method
// 2. evaluate:  Instance Method Parameter
// 3. call:  Instance Method Parameter
// 4. call:  Instance Method
// 5. evaluate:  Instance Property
// 6. call:  Instance Property
// 7. evaluate:  Static Property
// 8. call:  Static Property
// 9. evaluate:  Static Method
// 10. evaluate:  Static Method Parameter
// 11. call:  Static Method Parameter
// 12. call:  Static Method
// 13. evaluate:  Class Decorator
// 14. evaluate:  Constructor Parameter
// 15. call:  Constructor Parameter
// 16. call:  Class Decorator
//
// even though here methods appeared first, when the rules above says properties go first,
// it depends on the appearance in code, which is higher(above) that will be first evaluated,
// but only in this case
//
// here it works like rules says, even though the first parameter is higher.
//
function f(key: string) {
  console.log("evaluate: ", key);
  return function () {
    console.log("call: ", key);
  };
}

class CC {
  @f("Outer Method")
  @f("Inner Method")
  method() {}
}
// the code above will print the following messages:
//
// 1. evaluate: Outer Method
// 2. evaluate: Inner Method
// 3. call: Inner Method
// 4. call: Outer Method

// class decorators
//
// type annotation:
type ClassDecorator2 = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;
// @Params:
// target: The constructor of the class.
//
// @Returns:
// if the class decorator returns a value, it will replace the class declaration.
// thus, it’s suitable for extending an existing class with some properties or methods.
//
// for example, we can add a toString method for all the classes to overwrite the original toString method.
//
type Consturctor = { new (...args: any[]): any };
//
function toString<T extends Consturctor>(BaseClass: T) {
  return class extends BaseClass {
    toString() {
      return JSON.stringify(this);
    }
  };
}
//
@toString
class CCC {
  public foo = "foo";
  public num = 24;
}
//
console.log(new CCC().toString());
// -> {"foo":"foo","num":24}
// It is a pity that we cannot define type-safe decorators, which means:
//
declare function Blah<T>(target: T): T & { foo: number };
//
@Blah
class Foo2 {
  bar() {
    return this.foo; // Property 'foo' does not exist on type 'Foo2'
  }
}
//
new Foo2().foo; // Property 'foo' does not exist on type 'Foo2'
// this is a well-known issue in typescript: https://github.com/microsoft/TypeScript/issues/4881
// what we can do for now is to provide a class with type information to be extended by the target class:
//
declare function Blah<T>(target: T): T & { foo: number };
//
class Base2 {
  foo: number;
}
//
@Blah
class Foo3 extends Base2 {
  bar() {
    return this.foo;
  }
}
new Foo3().foo;

// property decorators
//
// type annotation:
type myPropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => void;
// @Params:
// 1. target: either the constructor function of the class for a static member, or
//            the prototype of the class for an instance member.
// 2. propertyKey: the name of the property.
//
// @Returns:
// the return value will be ignored.
// except being used to collect information,
// property decorators can also be used to add some methods or properties to the class.
//
// for example, we can write a decorator to add the ability to listen changes on some properties.
//
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
//
function observable(target: any, key: string): any {
  // prop -> onPropChange
  const targetKey = "on" + capitalizeFirstLetter(key) + "Change";

  target[targetKey] = function (fn: (prev: any, next: any) => void) {
    let prev = this[key];
    Reflect.defineProperty(this, key, {
      set(next) {
        fn(prev, next);
        prev = next;
      },
    });
  };
}
//
class C2 {
  @observable
  foo = -1;

  @observable
  bar = "bar";
}
//
const c2 = new C2();
//
c2.onFooChange((prev, next) => console.log(`prev: ${prev}, next: ${next}`));
c2.onBarChange((prev, next) => console.log(`prev: ${prev}, next: ${next}`));
//
c2.foo = 100; // -> prev: -1, next: 100
c2.foo = -3.14; // -> prev: 100, next: -3.14
c2.bar = "baz"; // -> prev: bar, next: baz
c2.bar = "sing"; // -> prev: baz, next: sing

// method decorators
//
// type annotation:
type MethodDecorator2 = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;
// @Params:
// 1. target: either the constructor function of the class for a static member,
//            or the prototype of the class for an instance member.
// 2. propertyKey: the name of the property.
// 3. descriptor: the property descriptor for the member;
//
// @Returns:
// if returns a value, it will be used as the descriptor of the member.
// what makes method decorators different from property decorators is the descriptor parameter,
// which lets us override the original implementation and inject some common logic.
//
// for example, we can add logger for some method to log out the input and output:
function logger(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args) {
    console.log("params: ", ...args);
    const result = original.call(this, ...args);
    console.log("result: ", result);
    return result;
  };
}
//
class C3 {
  @logger
  add(x: number, y: number) {
    return x + y;
  }
}
//
const c3 = new C3();
c3.add(1, 2);
// -> params: 1, 2
// -> result: 3

// accessor decorators
//
// accessor decorators are generally the same as method decorators.
//
// the only differences are the keys in the descriptor:
//
// 1. the descriptor in a method decorator has keys:
//    value
//    writable
//    enumerable
//    configurable
//
// 2. the descriptor in an accessor decorator has keys:
//    get
//    set
//    enumerable
//    configurable
//
// for example, we can make the property immutable by a decorator:
function immutable(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.set;

  descriptor.set = function (value: any) {
    return original.call(this, { ...value });
  };
}
//
class C4 {
  private _point = { x: 0, y: 0 };

  @immutable
  set point(value: { x: number; y: number }) {
    this._point = value;
  }

  get point() {
    return this._point;
  }
}

const c4 = new C4();
const point4 = { x: 1, y: 1 };
c4.point = point;

console.log(c4.point === point);
// -> false

// parameter decorators
//
// type annotation:
type ParameterDecorator3 = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => void;
// @Params:
// 1. target: either the constructor function of the class for a static member,
//            or the prototype of the class for an instance member.
// 2. propertyKey: the name of the property (Name of the method, not the parameter).
// 3. parameterIndex: the ordinal index of the parameter in the function’s parameter list.
//
// @Returns:
// the return value will be ignored.
//
// a standalone parameter decorator can’t do much,
// it’s typically used to record information which can be used by other decorators.

// when to use ?
//
// its up to you, but some usual cases:
//
// 1. Before/After hooks.
// 2. Watch property changes and method calls.
// 3. Transform parameters.
// 4. Add extra methods or properties.
// 6. Runtime type validation.
// 7. Auto serialization and deserialization.
// 8. Dependency Injection.
