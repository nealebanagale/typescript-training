/**
 * TypeScript can go above and beyond the types that JavaScript provides out of the box and define custom types 
 * that describe the data structures and behavior that your application uses
 * 
 * TypeScript offers three ways to define a custom type: 
 * interfaces
 * classes
 * enums
 */

//Interfaces
//it acts as a contract that describes the data and the behaviors that the object exposes for others to interact with
//interfaces are use in compile-time only, no affect on the code at runtime
//Consider interfaces a way to tell TypeScript information about objects to help you catch more errors at build time, but don't ever rely on them being there at runtime. 

//interface that defines the data structure
interface Todo {
    name: string;           //data fields
    completed?: boolean;    //nullable
}
// var todo = <Todo>{}; //casting syntax
var todo2: Todo = {
    name: "Pick up drycleaning"
};

//interface that has a service methods
interface ITodoService {
    add(todo: Todo) : Todo;
    delete(todoId: number) : void;  //return nothing
    getAll() : Todo[];
    getById(todoId: number) : Todo;
}


//Interface to describe functions
interface jQuery {
    (selector: (string | any)): jQueryElement; //function property without a name && returns jQueryElement interface
    fn: any;
    version: number;
}

var $ = <jQuery>function(selector) {
    //find DOM element
}

$.version = 1.12

//Extending interface definitions
//apply this on code you dont own - extending behavior of a third-party library
interface jQueryElement {
    data(name: string) : any;
    data(name: string, data: any) : jQueryElement;
}
interface jQueryElement {
    todo(): Todo;
    todo(todo:Todo): jQueryElement;
}
$.fn.todo = function(todo?: Todo) : Todo {
    if (todo) {
        $(this).data('todo',todo);
    } else {
        return $(this).data('todo');
    }
}

var todo = {name: 'Pick up drycleaning'};
var container = $('#container');        //jquery function to get an element
container.data('todo', todo);           //used data method to assign the todo object to the DOM element's data property named 'todo'. 
var savedTodo = container.data('todo'); //used overload of the data method to extract the value set

//ENUMS 
//magic number:  same code is completely unreadable because we have no idea what this magic number refers to
interface NewTodo {
    name: string;
    state: TodoState.New;   //enum
}

enum TodoState {
    New = 1,
    Active,
    Completed,
    Deleted
}

var newTodo: NewTodo = {
    name: "Pick up drycleanig",
    state: 1
};

function deleteTodo(todo: NewTodo) {
    if (todo.state != TodoState.New) {
        throw "Can't delete incomplete"
    }
}

//Anonymous Type
//Rather than define the whole interface with just one property, define the type right inline 
var todoAny: {name: string};    //
// todoAny = {age: 41}

function totalLength(x: {length: number}, y: {length: number}) : number {   //param changed
    var total: number = x.length + y.length;
    return total
}