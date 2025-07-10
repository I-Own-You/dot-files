// extending type via intersections:
type Animal = {
    name: string;
};
type Bear = Animal & {
    honey: boolean;
};
function getBear(): Bear {
    return { honey: true, name: "hey" };
}
const bear = getBear();
bear.name;
bear.honey;

// just so namings from ohter .ts file wont conflict
export {};
