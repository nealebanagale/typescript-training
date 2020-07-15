//Generics - are a way to create functions and classes that define a behavior that can be reused across many different types while retaining the full information about that type
//Generics Syntax: '<NAME>' right after the function name, but before the parenthesis containing the parameter
function clone<T> (value: T) : T {                 //referring to the type by 'T' / the input type will be the same as the output type
    let serialized = JSON.stringify(value);
    return JSON.parse(serialized);          //does not know the object coming come out when that string is deserialized
}

interface Todo {
    id: number;
    name: string;
    state: TodoState;
}

enum TodoState {
    New = 1,
    Active,
    Complete,
}

clone('Hello!');        // T = string
clone(123);             // T = number

var todo: Todo = {
    id: 1,
    name: 'Pick up drycleaning',
    state: TodoState.Active
}

clone(todo);            // T = object

//object literal
clone({name: 'Jess'});  // T = unamed type with name property


//Creating Generic Classes
//Good way to group generic methods that operate on the same type of objects
//Typescript treats Javascript array type as a generic class.
var array: number[] = [1,2,3];
var array2: Array<number> = [1,2,3];        //generic array type

class KeyValuePair<Tkey, TValue> {
    constructor(
        public key: Tkey,
        public value: TValue
    ) {
    }
}

//TypeScript dynamically inferring the generic type parameters based on the passed values
let pair1 = new KeyValuePair<number, string>(1,'First');    //explicitly defining types intended
let pair2 = new KeyValuePair<string, Date>('Second', new Date(Date.now()));     //Date.now returns miliseconds of date
let pair3 = new KeyValuePair('Third', 3);
let pair4 = new KeyValuePair('Four', 4);

pair2.key;  //accessible

class KeyValuePairPrinter<T,U> {
    constructor(private pairs: KeyValuePair<T,U>[]) {
    }
    print() {
        for (let p of this.pairs) {
            console.log(`${p.key}:${p.value}`);
        }
    }
}

var printer = new KeyValuePairPrinter([pair3, pair4]);  //they share the same key and value types / TypeScript now know the types
// var printer = new KeyValuePairPrinter([pair1, pair4]);  //error - does not share the same key and value types
printer.print();


//Applying Generic Constraints
//To add constraint in generic type parameter, add 'extends' keyword followed by the type describing the constraint
interface IHaveLength {
    length: number;
}
function totalLength<T extends IHaveLength>(x: T, y: T) {                    //type T is not strictly true. They can be any type that is compatible with type T, including those types that inherit from it
// function totalLength<T extends {length: number}>(x: T, y: T) {
    var total: number = x.length + y.length;        //accepts only objects that have length field
    return total;
}

//Custom base class that extends the base Array class.
class CustomArray<T> extends Array<T> {}    //instance of Array class because it inherits from Array class

// var length = totalLength('Jess', [1,2,3]); //duck problem
var length = totalLength('Jess', 'Chadwick');
var length = totalLength([1,2,3], [1,2]);
var length = totalLength([1,2,3], new CustomArray<number>());   //matches the same parameter T

//TypeScript do not allow to refer to generic parameters that you defined in the same type list
// class KeyValuePairPrinter<T,U,V extends KeyValuePair<T,U>> {
//     constructor(private pairs: V[]) {
//     }
//     print() {
//         for (let p of this.pairs) {
//             console.log(`${p.key}:${p.value}`);
//         }
//     }
// }