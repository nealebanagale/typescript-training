/***
 * ECMAScript 5 Types
 * boolean  (primitive type)
 * number   (primitive type)
 * string   (primitive type)
 * null / undefined
 * object (key/value)
 * Functions: contains logic that can be executed
 * Array: contains collections of value, represented values by interger key
 * 
 * Prototypical Inheritance
 * Both functions and arrays are enhanced which they received from prototype
 * As an OOP, JS offers the ability to share properties and behavior between different types thru inheritance
 * 
 * Prototypical inheritance: simply means that an object is defined that contains the base properties and behavior to be shared, 
 * and when new instances of that type are created, JavaScript links those new instances to the properties and behaviors of the base class
 * NOT ALL JS OBJECTS MUST BE CREATED FROM A CONSTRUCTOR THAT HAS A PROTOTYPE
 * 
 * Object Literals
 * An object literal is nothing more than a way to define and instantiate an object all at the same time using a very simple and straightforward syntax.
 */

var container = document.getElementById('container');

//Object Literal
var animalO ={
    name: "Fido",
    species: "Dog",
    age: 5,
    speack: function() {console.log('Woof!');}
}
function makeTheAnimalSpeak(animal) {
    animal.speack();
}
makeTheAnimalSpeak(animalO)

//Type Inference
//Static analysis: regardless of whether you explicitly define types or not, TypeScript looks through your code, doing its best to guess or infer what type any given object could be
//TypeScript will enforce these inferred types (string,number,function)
var animal ={
    name: "Fido",
    species: "Dog",
    age: calculateAge(2010),    //inference will be displayed by TypeScript
    speack: function() {console.log('Woof!');}
}

//TypeScript has figured out that the type of the return value will be a number
function calculateAge(birthYear) {
    return Date.now() - birthYear;
}

//inference limit
//whenever TypeScript doesn't have enough information to definitively figure out what the type of a given object is, it simply says the any type
//The any type is the most dynamic and unrestrictive type available, in other words, the default dynamic type behavior of JavaScript. 
//Reserve the any type only for cases when you're actually working with a dynamic object 
function totalLengthInference(x, y) {
    let total = x.length + y.lenth; //TypeScript isn't even able to offer us the most basic static typing protection for warning (mis-splled property name, like length)
    return total;
}

//Specifying JavsScript types
function totalLengthTypes(x: any[], y: string): number {
    let total: number = x.length + y.length; 
    return total;
}

//Specifying function parameter types
//union types: allow each of the arguments to accept either a string or an array
//To specify a union type, simply use the pipe operator (OR operator), to list additional types that are acceptable. 
function totalLengthUnion(x: (string | any[]), y: string | any[]): number {
    let total: number = x.length + y.length; 
    x.slice(0);
    if (x instanceof Array) {       //type guard syntax
        x.push('abc');
    }
    if (typeof x === 'string') {    //syntax for primitive types (string,boolean,number)
        x.substr(1);
    }
    
    return total;
}

//Overload functions
//statically typed language like C# or Java implemention uses multiple different signatures of the function, just sharing the same name
function totalLength(x: string, y: string) : number     //function overload
function totalLength(x: any[], y: any[]) : number       //function overload
function totalLength(x: (string | any[]), y: string | any[]): number {
    let total: number = x.length + y.length; 
    x.slice(0);
    if (x instanceof Array) {       
        x.push('abc');
    }
    if (typeof x === 'string') {    
        x.substr(1);
    }
    
    return total;
}
