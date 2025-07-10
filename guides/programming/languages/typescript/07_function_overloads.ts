// function overloads

// overload signature, without implementation
function makeDate(timestamp: number): Date;
// overload signature, without implementation
function makeDate(m: number, d: number, y: number): Date;
// implementatoin for the signature with 1 or 3 paramter,
// we cant call it with 2 paramters because we dont have a signature for it
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3); // error, there are no func signatures with 2 paramters

// we cant call a funciton overload for a value that has a state between like this:
function myLen(s: string): number;
function myLen(arr: any[]): number;
function myLen(x: any) {
    return x.length;
}
myLen(""); // OK
myLen([0]); // OK
// here the result is either string or number[], the overload only addresses to one signature at a time
myLen(Math.random() > 0.5 ? "hello" : [0]);
//a better approach
function len(x: any[] | string) {
    // always prefer unions over overloads
    return x.length;
}

// [this] cant be used as name paramter, but you can assign it a type:
interface DB {
    // here this is User type, not the name this as a paramter but the actual this keyword
    filterUsers(filter: (this: User) => boolean): User[];
}
const db = getDB();
const myAdmins = db.filterUsers(function (this: User) {
    return this.admin;
});
// you also cant use this in arrow function because this is captured from global state
const admins = db.filterUsers(() => this.admin);

// just so namings from ohter .ts file wont conflict
export {};
