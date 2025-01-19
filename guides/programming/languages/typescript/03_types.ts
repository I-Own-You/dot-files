// extending type via intersections:
type Animal = {
  name: string;
};
type Bear = Animal & {
  honey: boolean;
};
const bear = getBear();
bear.name;
bear.honey;

// interfaces and types can also be generic:
type dBox<Type> = {
  contents: Type;
};

// also madness like this is possible
type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
// type OneOrManyOrNull<Type> = OneOrMany<Type> | null
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
// type OneOrManyOrNullStrings = OneOrMany<string> | null
//
// string[], number[] and all others are just shorthands for Array<Type> like Array<string>.
// Array itslef is a generic interface
