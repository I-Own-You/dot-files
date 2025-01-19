// mixins: https://www.typescriptlang.org/docs/handbook/mixins.html
const Pausable = (target: typeof Player) => {
  return class Pausable extends target {
    shouldFreeze = false;
  };
};
@Pausable
class Player {
  x = 0;
  y = 0;
}
const player = new Player();
player.shouldFreeze;

// the preceding approaches was to imlement an interface or define the property on class,
// this approach shows '&' that you can intersect 2 types to get 1
type FreezablePlayer = Player & { shouldFreeze: boolean };
const playerTwo = new Player() as unknown as FreezablePlayer;
playerTwo.shouldFreeze;

// also, static members cant be generic, right ? heres a workaround:
function base<T>() {
  class Base {
    static prop: T;
  }
  return Base;
}
function derived<T>() {
  class Derived extends base<T>() {
    static anotherProp: T;
  }
  return Derived;
}
class Spec extends derived<string>() {}
Spec.prop; // string
Spec.anotherProp; // string
