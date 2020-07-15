var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Generics - are a way to create functions and classes that define a behavior that can be reused across many different types while retaining the full information about that type
//Generics Syntax: '<NAME>' right after the function name, but before the parenthesis containing the parameter
function clone(value) {
    var serialized = JSON.stringify(value);
    return JSON.parse(serialized); //does not know the object coming come out when that string is deserialized
}
var TodoState;
(function (TodoState) {
    TodoState[TodoState["New"] = 1] = "New";
    TodoState[TodoState["Active"] = 2] = "Active";
    TodoState[TodoState["Complete"] = 3] = "Complete";
})(TodoState || (TodoState = {}));
clone('Hello!'); // T = string
clone(123); // T = number
var todo = {
    id: 1,
    name: 'Pick up drycleaning',
    state: TodoState.Active
};
clone(todo); // T = object
//object literal
clone({ name: 'Jess' }); // T = unamed type with name property
//Creating Generic Classes
//Good way to group generic methods that operate on the same type of objects
//Typescript treats Javascript array type as a generic class.
var array = [1, 2, 3];
var array2 = [1, 2, 3]; //generic array type
var KeyValuePair = /** @class */ (function () {
    function KeyValuePair(key, value) {
        this.key = key;
        this.value = value;
    }
    return KeyValuePair;
}());
//TypeScript dynamically inferring the generic type parameters based on the passed values
var pair1 = new KeyValuePair(1, 'First'); //explicitly defining types intended
var pair2 = new KeyValuePair('Second', new Date(Date.now())); //Date.now returns miliseconds of date
var pair3 = new KeyValuePair('Third', 3);
var pair4 = new KeyValuePair('Four', 4);
pair2.key; //accessible
var KeyValuePairPrinter = /** @class */ (function () {
    function KeyValuePairPrinter(pairs) {
        this.pairs = pairs;
    }
    KeyValuePairPrinter.prototype.print = function () {
        for (var _i = 0, _a = this.pairs; _i < _a.length; _i++) {
            var p = _a[_i];
            console.log(p.key + ":" + p.value);
        }
    };
    return KeyValuePairPrinter;
}());
var printer = new KeyValuePairPrinter([pair3, pair4]); //they share the same key and value types / TypeScript now know the types
// var printer = new KeyValuePairPrinter([pair1, pair4]);  //error - does not share the same key and value types
printer.print();
function totalLength(x, y) {
    // function totalLength<T extends {length: number}>(x: T, y: T) {
    var total = x.length + y.length; //accepts only objects that have length field
    return total;
}
//Custom base class that extends the base Array class.
var CustomArray = /** @class */ (function (_super) {
    __extends(CustomArray, _super);
    function CustomArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomArray;
}(Array)); //instance of Array class because it inherits from Array class
// var length = totalLength('Jess', [1,2,3]); //duck problem
var length = totalLength('Jess', 'Chadwick');
var length = totalLength([1, 2, 3], [1, 2]);
var length = totalLength([1, 2, 3], new CustomArray()); //matches the same parameter T
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
