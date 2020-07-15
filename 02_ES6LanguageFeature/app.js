var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a, _b;
var container = document.getElementById('container');
// Optional Parameters
//allows you to specify a default value for a given parameter in the case that a value is not explicitly passed in
//specify that a parameter is optional by simply adding '=' after the parameter name and then specifying the default value 
function countdown(initial, final, interval) {
    if (final === void 0) { final = 0; }
    if (interval === void 0) { interval = 1; }
    var current = initial;
    while (current > final) {
        container.innerHTML = current;
        current -= interval;
    }
}
countdown(10, 0, 1);
countdown(10);
countdown(10, 4);
countdown(10, 4, 2);
//Template Strings
var todo = {
    id: 123,
    name: "Pick up drycleaning",
    completed: true
};
var displayName = "Todo #" + todo.id; //JS string literal = '' or ""
container.innerHTML = "\n    <div> todo='" + todo.id + "' class=\"list-group-item\">\n        <i class=\"" + (todo.completed ? "" : "hidden") + " text-success glyphicon glyphicon-ok\"></i>  \n        <span class=\"name\">" + todo.name + "</span>\n    </div>\n";
//let and const
//JS for loops can be accessed outside its scope
//let: use the let keyword pretty much anywhere that you're currently used to using the var keyword today
//const: create a variable and initialize it to a certain value, then never let that value change
for (var x = 0; x <= 5; x++) {
    var counter = x;
    // let counter = x //variable will not be visible
    // const counter = x
    // counter = 1 //cannot replace value
}
console.log(counter);
//For..of loops
var array = [
    "Pick up drycleaning",
    "Clean batcave",
    "Save Gotham"
];
for (var index in array) { //for-in
    var value = array[index];
    console.log(index + ":" + value);
}
for (var _i = 0, array_1 = array; _i < array_1.length; _i++) { //for-of
    var index = array_1[_i];
    console.log("" + value);
}
//Lamdas (Arrow function)
//this keyword: wacky behaviour
//arrow function: address this referencing problem
// function CounterThis(el) {
//     this.count = 0;
//     el.innerHTML = this.count;
//     let _this = this;
//     el.addEventListener('click',
//         function(){
//             // this.count += 1;    //will not work. this.count is different in global browser scope
//             // el.innerHTML = this.count;
//             _this.count += 1;
//             el.innerHTML = _this.count;
//     });
// }
// new CounterThis(container)
//Lamda
function Counter(el) {
    var _this = this;
    this.count = 0;
    el.innerHTML = this.count;
    el.addEventListener('click', function () {
        _this.count += 1;
        el.innerHTML = _this.count;
    });
}
new Counter(container);
var filtered = [1, 2, 3].filter(function (x) { return x > 0; }); //parentheses can be omitted around the parameter if there is only one parameter
var filtered = [1, 2, 3].filter(function (x, y) { return (x + y) > 0; });
//Destructuring
//it is the ability to assign values to multiple variables from a single object with a single statement.
//easiest way to think of destructuring is that it's the reverse of creating a bunch of variables and combining them into an array. 
var array = ["123", "Pick up drycleaning", "false"];
var id = array[0], title = array[1], completed = array[2]; //simpliest form of destructuring
//switching of values
var a = 1;
var b = 5;
var temp = a;
a = b;
b = temp;
_a = [b, a], a = _a[0], b = _a[1]; //destructuring
//object destructuring has slightly different syntax
//the values aren't assigned by their location in the object, but by matching the name of the property with the name of the variable.
function getTodo(id) {
    var todoD = {
        idD: 123,
        nameD: "Pick up drycleaning",
        completedD: false
    };
    return todoD;
}
var _c = getTodo(123), idD = _c.idD, nameD = _c.nameD, completedD = _c.completedD; //property name = variable name
var _d = getTodo(123), todoId = _d.idD, todoName = _d.nameD, isCompleted = _d.completedD; //assigning different variable name
//The Spread Operator
//used for cleaning up code with a lot of array implementation
//old implem
function addOld() {
    var values = Array.prototype.splice.call(arguments, [1]), //converts to array for iteration
    total = 0;
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var value = values_1[_i];
        total += value;
    }
    return total;
}
function calculate(action) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var total = 0;
    for (var _a = 0, values_2 = values; _a < values_2.length; _a++) {
        var value = values_2[_a];
        switch (action) {
            case 'add':
                total += value;
                break;
            case 'subtract':
                total -= value;
                break;
        }
    }
    return total;
}
calculate('add', 1, 2, 3, 4, 5);
var source = [3, 4, 5];
var target = __spreadArrays([1, 2], source, [6, 7]); //spread operator
var listSpread = [1, 2, 3];
var toAdd = [4, 5, 6];
listSpread.push.apply(listSpread, toAdd); //spread operator
//Computed properties
//allows you to define a property on an object with a name that is computed dynamically at runtime
//used on dynamic codes with dynamic names
var osPrefix = 'os_';
var support = (_b = {},
    _b[osPrefix + 'Windows'] = isSupported('Windows'),
    _b[osPrefix + 'iOS'] = isSupported('iOS'),
    _b[osPrefix + 'Android'] = isSupported('Android'),
    _b);
function isSupported(os) {
    return Math.random() >= 0.5;
}
