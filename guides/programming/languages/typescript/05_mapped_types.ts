// mapped types - are constructed with index signature:
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};
const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

// generic mapped type:
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};
type FeatureOptions = OptionsFlags<Features>;
// type FeatureOptions = {
//     darkMode: boolean;
//     newUserProfile: boolean;
// }

// mapped types have 2 modifiers, readonly and ? for mutability and optionality,
// you can also prefix it with - or +, - means removing the attribute explicitly, and + is the default one:
type CreateMutable<Type> = {
  readonly [Property in keyof Type]: Type[Property]; // just to show
  // [Property in keyof Type]-?: Type[Property]; // just to show
};
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
type UnlockedAccount = CreateMutable<LockedAccount>;
// type UnlockedAccount = {
//     id: string;
//     name: string;
// }

// you can remap keys with 'as' keyword:
type Getters<Type> = {
  [Property in keyof Type as `get${Property}`]: () => Type[Property];
};
interface Person {
  name: string;
  age: number;
  location: string;
}
type LazyPerson = Getters<Person>;
// type LazyPerson = {
//     getName: () => string;
//     getAge: () => number;
//     getLocation: () => string;
// }
// you can also use literal types to build something complex
type RemoveKindField<Type> = {
  // Exclude< > is a builtin interface
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};
interface Circle {
  kind: "circle";
  radius: number;
}
type KindlessCircle = RemoveKindField<Circle>;
// type KindlessCircle = {
//     radius: number;
// }
// another complex example of a union of diff type rather than primitive ones:
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};
type SquareEvent = { kind: "square"; x: number; y: number };
type CircleEvent = { kind: "circle"; radius: number };
type Config = EventConfig<SquareEvent | CircleEvent>;
type mConfig = {
  square: (event: SquareEvent) => void;
  circle: (event: CircleEvent) => void;
};
// mapped type with conditional types:
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
type mObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
type ObjectsNeedingGDPRDeletion = {
  id: false;
  name: true;
};
