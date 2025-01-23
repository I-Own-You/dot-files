// mapped types - are constructed with index signature:
type Horse = number;
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
  // adds optionality, you can assign undefined as property value
  [Property in keyof Type]?: Type[Property];
  //
  // adds optionality, you can assign undefined as property value
  // [Property in keyof Type]?: Type[Property];
  //
  // removes optionality, you can assign undefined as property value
  // [Property in keyof Type]-?: Type[Property];
  //
  // adds readonly, you can mutate the property value
  // readonly [Property in keyof Type]: Type[Property];
  //
  // removes readonly, you can mutate the property value
  // -readonly [Property in keyof Type]: Type[Property];
  //
  // you can combine mutability and optionality.
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
  [Property in keyof Type as Property extends string
    ? `get${Capitalize<Property>}`
    : never]: () => Type[Property];
};
interface Person {
  name: string;
  age: number;
  location: string;
}
type LazyPerson = Getters<Person>;
// LazyPerson = {
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
// Config = {
//   square: (event: SquareEvent) => void;
//   circle: (event: CircleEvent) => void;
// };

// mapped type with conditional types:
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
// ObjectsNeedingGDPRDeletion = {
//   id: false;
//   name: true;
// };
