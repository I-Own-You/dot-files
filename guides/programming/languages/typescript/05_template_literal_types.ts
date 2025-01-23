// template lietral types are constructed from literal types used in stirng interpolation with unions:
type World = "world";
type mGreeting = `hello ${World}`;
type aGreeting = "hello world";
// complex example
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type eAllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
// and even more complex
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
// type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id"  |
//  "en_footer_title_id"  | "en_footer_sendoff_id" |
//  "ja_welcome_email_id" | "ja_email_heading_id"  |
//  "ja_footer_title_id"  | "ja_footer_sendoff_id" |
//  "pt_welcome_email_id" | "pt_email_heading_id"  |
//  "pt_footer_title_id"  | "pt_footer_sendoff_id"
//
// its ok to do such things with small amount of string literals, but bad with more

// a complex example:
type PropEventSource<Type> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void
  ): void;
};
declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource<Type>;
const myPerson = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});
myPerson.on("firstNameChanged", () => {}); // no error
myPerson.on("firstName", () => {}); // error,
myPerson.on("frstNameChanged", () => {}); // error
//
// now the same function as above but infering the type making the method generic
type mPropEventSource<Type> = {
  on<Key extends string & keyof Type>( // pulled the string literal into Key generic type
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void;
};
declare function zmakeWatchedObject<Type>(
  obj: Type
): Type & mPropEventSource<Type>;
const person = zmakeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});
person.on("firstNameChanged", (newName) => {
  //(parameter) newName: string
  console.log(`new name is ${newName.toUpperCase()}`);
});
person.on("ageChanged", (newAge) => {
  //(parameter) newAge: number
  if (newAge < 0) {
    console.warn("warning! negative age");
  }
});

// there are intrisinc string literal manipulation for performance,
// basically changing string with builtin types:
//
// Uppercase<T>
type eGreeting = "Hello, world";
type ShoutyGreeting = Uppercase<Greeting>; //type ShoutyGreeting = "HELLO, WORLD"
type aASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type bMainID = ASCIICacheKey<"my_app">; //type MainID = "ID-MY_APP"
// Lowercase<T>
type zGreeting = "Hello, world";
type QuietGreeting = Lowercase<Greeting>; //type QuietGreeting = "hello, world"
type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`;
type MainID = ASCIICacheKey<"MY_APP">; //type MainID = "id-my_app"
// Capitalize<T>
type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>; //type Greeting = "Hello, world"
// Uncapitalize<T>
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>; //type UncomfortableGreeting = "hELLO WORLD"
// under the hood it uses js runtime so it just becomes string.toLowerCase() and etc
