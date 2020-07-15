/**
 * Classes
 * 
 * OOP functionality:
 * inheritance
 * abstraction
 * encapsulation
 * 
 * TypeScript doesn't introduce the concept of a class. ECMAScript 6 does
 * JS Prototypical Inheritance = prototype-based programming
 * Prototype-based programming: 
 * - starts with a special object that can share behavior across objects called the prototype
 * - define behavior on the prototype object and then link other object instances to that object
 *      JavaScript objects are just bags of dynamic properties***
 *      JavaScript first looks for the member on the object itself, then it looks at the object's prototype object to see if the member exists on that object
 *      Otherwise, it accesses the prototype's prototype and the cycle continues all the way up the chain the root of everything (Object Prototype)
 *      Object Prototype: an object that you can see and interact with
 *          var todo = {}; - Links to Object.prototype
 *          var array = []; - Links to Array.prototype
 *          fun foo() - Links to Function.prototype
 * 
 * Initializing an object with a 'new' keyword:
 * 1. it creates a new object
 * 2. it sets the new object's prototype to the constructor function's prototype
 * 3. it executes the function that you called with the new keyword, referring to the new object as this within that method
 */
          
//Prototypical Inheritance
function TodoService2() {        //constructor function
    this.todos = [];            //this = refers to the object that JavaScript just created for us in line 28
}

TodoService2.prototype.getAll = function() {
    return this.todos;
}

var service = new TodoService2();        //create new instance of TodoService
service.getAll();                       //call methods defined on the prototype, like defined on the instance itself


//Class
class TodoServiceClass {
    //class's constructor function - is the function that JavaScript calls to initialize the new object. 
    constructor(private todos: TodoClass[]) {            //access modifier = private with constructor parameter and class property
                                                    
    }
    getAll() {
        return this.todos;
    }
}

interface TodoClass {
    name: string;
}


//Applying Static Properties
//static = guarantee a unique value across your entire application
//global variables (var latestId = 0) : are now generally considered bad practice and to be avoided at all costs
//static variable practice is to attach it to an object, especially the function that is going to use it the most.
//
function TodoService() {
    
}
TodoService.lastId = 0;

TodoService.getNextId = function() {                //defining new static method
    return TodoService.getNextId()
}

TodoService.prototype.add = function(todo) {        //defining new static variable
    var newId = TodoService.lastId += 1;
}

class TodoServiceStatic {
    static lastId: number = 0;                      //static property with type information and initial value
    constructor(private todos: TodoClassStatic[]) {
                                                    
    }
    getAll() {
        return this.todos;
    }

    static getNextId() {                            //static method
        return TodoServiceStatic.lastId += 1;
    }

}

interface TodoClassStatic {
    name: string;
}


//Properties Accessors (getters and setters)
//you can implement either one accessors (getter or setter), or both of them, depending on what you're trying to accomplish
//Accessor must be put in a class, and create new instances of that class
interface TodoAccessor {
    name: string;
    state: TodoStateAccessor;
}

enum TodoStateAccessor {
    New = 1,
    Active,
    Complete,
    Deleted
}

class SmartTodo {
    name: string;
    _state: TodoStateAccessor;
    get state() {                                            //define getter
        return this._state;
    }
    set state(newState) {                                   //define setter
        if (newState == TodoStateAccessor.Complete) {
            var canBeCompleted = 
                this.state == TodoStateAccessor.Active
                || this.state == TodoStateAccessor.Deleted;

            if (!canBeCompleted) {
                throw "Todo must be Active or Deleted in order to be marked Completed"
            }
        }
        this._state - newState;                              //getter & setter has access
    }

    constructor(name: string) {
        this.name = name;
    }
}

var todo = new SmartTodo("Pick up drycleaning");    //instantiate class
todo.state = TodoStateAccessor.Complete;    //set
todo.state;                                 //get



//Inheriting behavior from Base Class
//class keyword can also introduce the ability for classes to inherit or extend 
//Inheriting  is use for extending or overriding
//ECMAScript 6 DO NOT support is the ability to define and inherit from abstract base classes
//TypeScript does support abstract classes
class TodoStateChanger {                                                  //base class
    constructor(protected newState: TodoStateForBase) {
    }

    canChangeState(todo: TodoForbase) : boolean {
        return !!todo;
    }

    changeState(todo: TodoForbase) : TodoForbase {
        if (this.canChangeState(todo)) {
            todo.state = this.newState;
        }
        return todo;
    }
}

class CompleteTodoStateChanger extends TodoStateChanger {                //extend class / inherit from class
    //derived class can create or not to create a constructor. It will simply inherit the constructor from base class constructor
    constructor() {
        //derived class must call the constructor on the base class
        super(TodoStateForBase.Complete);        //super() - calls the constructor on the base class and serves as the base class
        this.newState;                           //protected
    }
    //Override
    canChangeState(todo: TodoForbase) : boolean {       
        return super.canChangeState(todo) && (
            todo.state == TodoStateForBase.Active || todo.state == TodoStateForBase.Deleted     //extending for additional logic
        )
    }
}

interface TodoForbase {
    name: string;
    state: TodoStateForBase;
}

enum TodoStateForBase {
    New = 1,
    Active,
    Complete,
    Deleted
}

//Implementing Abstrac Class
abstract class TodoStateChangerAbstract {                       //base class
    constructor(private newState: TodoStateForBase) {
    }
    abstract canChangeState(todo: TodoForbase) : boolean        //abstract method - Typescript will enforce every derived class to implement its own canChangeState method. 
}

class TodoAbstract extends TodoStateChangerAbstract {
    canChangeState(todo: TodoForbase) : boolean {               //referencing the abstract method 
        return !!todo && (
            todo.state == TodoStateForBase.Active || todo.state == TodoStateForBase.Deleted     //extending for additional logic
        )
    }
}

//Controlling Visibility with Access Modifiers
//'private' keyword is an access modifier, used to hide members of a class from being accessed outside of that class
//Typescript three access modifiers to protect the members of your classes: 
//private - restrictive modifier, only methods defined on the same class definition may access that member
//protected - similar with private, but expands its definition to any classes that inherit or extend from this class
//public - least restrictive
//Javascript doesn't actually support private members
//How can Typescript support private when Javascript doesn't? 
//Javascript objects are just bags of dynamic properties, and once you add a property to the bag, that property is accessible to everyone who has access to that object
class TodoServicePrivate {

    private static _lastId: number = 0;                         //private


    //accessrors must have the same access modifier
    private get nextId() {      
        return TodoServicePrivate.getNextId();
    }

    private set nextId(nextId) {
        TodoServicePrivate._lastId = nextId - 1;
    }

    constructor(protected todos: TodoStateForPrivate) {         //protected
    }

    add(todo: TodoForPrivate) {
        var newId = this.nextId;
    }

    private getAll() {
        return this.todos;
    }

    static getNextId() {
        return TodoServicePrivate._lastId += 1;
    }
}

class TodoServicePrivateExt extends TodoServicePrivate {
    constructor() {
        super(TodoStateForPrivate.Complete);
        this.todos;
    }
}

interface TodoForPrivate {
    name: string;
    state: TodoStateForPrivate;
}

enum TodoStateForPrivate {
    New = 1,
    Active,
    Complete,
}

//Implementing Interfaces
//Interfaces exist only to attach them to classes
//Class can implement multiple interfaces at once

interface IIdGenerator {
    nextId: number;
    prevId: number;
}

class TodoServiceInterface implements ITodoService, IIdGenerator {            //class implements interface
    private static _lastId: number = 0;
    
    constructor(private todos: TodoForInterface[]) {
    }

    get nextId() {
        return TodoServiceInterface._lastId += 1;
    }
    get prevId() : number {                                                 //interface implem
        return TodoServiceInterface._lastId -= 1;
    }

    add(todo: TodoForInterface) {
        todo.id = this.nextId;
        this.todos.push(todo);
        return todo;
    }

    delete (todoId: number) : void {
        var toDelete = this.getById(todoId);
        var deletedIndex = this.todos.indexOf(toDelete);    //get where the todo is in the array
        this.todos.splice(deletedIndex, 1);                 //used the index value to remove todo
    }

    getAll() {        
        var clone = JSON.stringify(this.todos);     //avoid manipulation vs return this.todos
        return JSON.parse(clone);
    }
    
    getById(todoId: number) : TodoForInterface {
        var filtered = this.todos.filter (
            x => x.id == todoId
        );
        if (filtered.length) {
            return filtered[0];
        }
        return null;
    }
}