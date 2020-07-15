//!!putting all of your code in the global namespace == BAD!
//This coding practice produces spaghetti code, because your entire application just becomes one giant ball of intertwined threads, without any way of telling where one component ends and another begins.
//To avoid spaghetti code - modularized code, keep components from one-another
//Encapsulation: Module Pattern/revealing Module Pattern
//Namespaces are an excellent way to avoid naming collisions and refer to a group of types as one organizational unit. 
//Hide from Global scope
//export - a keyword to use types outside of the scope
//External Modules
//Uses the file itself as the module scope
//Both equired components needs to be exported/imported
//ECMAScript 2015 Syntax: not widely supported in browsers yet, no standard definition loading modules

/***
namespace TodoApp.Model {
    export  interface TodoNameNamespace {
        id: number;
        name: string;
        state: TodoStateNamespace;
    }
}

//multiple namespace in the same file
namespace TodoApp.Model {               //same namespace
    export enum TodoStateNamespace {
        New = 1,
        Active,
        Completed,
        Deleted
    }
}
*/

//Using namespaces to enacapsulate private members
// Namespaces = Internal Modules
//Immediately Invoked Function Expression, or IIFE: pattern to encapsulate code while it executes and then choose which parts of the code will be exposed by specifying them as the return value
var jQuery = {
    version: 1.19,
    fn: {}  //attach custom functions
};
//IIFE functions
(function defineType($) {   
    if( $.version < 1.15 )
    throw 'Plugin requires jQuery version 1.15+'
    
    $.fn = function() {
    // my plugin code
    }

})(jQuery)    //IFI / follow the function with a set of parentheses - executes the function


//Importing using ECMA Script
//require syntax
// import Model = require('./Model');   

//ES2015 syntax
// import * as Model from './Model';      //* = import all exported from the module and attach to temp object 'Model'

//Individual export
import { TodoNameNamespace as Todo, TodoStateNamespace } from './Model'; 
// import './jQuery';  //module getting loaded and note relying on nay particular exports
let todo: Todo;

//Loading External Modules
//Module Loader: System.js - load module files and manage module imports at runtime
import { TodoService } from './DataAccess';
let service = new TodoService([]);
service.add({
    id: 1,
    name: 'Pick up drycleaning',
    state: TodoStateNamespace.New
});

let todos = service.getAll();

todos.forEach( todo => 
    console.log(`${todo.name} [${TodoStateNamespace[todo.state]}]`)
);

