// to have more precise control over types,
// you can use a type predicate(also called user defined type guard)

type Fish = { swim: () => void };
type Bird = { fly: () => void };
function getSmallPet() {
  return {
    swim() {
      console.log("fish");
    },
  };
}

// pet is Fish is a predicate that tells the function body that pet must be a Fish,
// and if not, then its a Bird
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
let pet = getSmallPet();
if (isFish(pet)) {
  // here in the if, pet is Fish
  pet.swim();
} else {
  // here pet is Bird
  pet.fly();
}
//another more complex example
const zoo: (Fish | Bird)[] = []; // Array<Fish | Bird> = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish); // same as bellow one
const underWater2: Fish[] = zoo.filter(isFish) as Fish[]; // same as above one

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
