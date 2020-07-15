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
 * - how you can share behavior across objects
 * - starts with a special object called the prototype
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
//Prototypical Inheritance
function TodoService2() {
    this.todos = []; //this = refers to the object that JavaScript just created for us in line 28
}
TodoService2.prototype.getAll = function () {
    return this.todos;
};
var service = new TodoService2(); //create new instance of TodoService
service.getAll(); //call methods defined on the prototype, like defined on the instance itself
//Class
var TodoServiceClass = /** @class */ (function () {
    //class's constructor function - is the function that JavaScript calls to initialize the new object. 
    function TodoServiceClass(todos) {
        this.todos = todos;
    }
    TodoServiceClass.prototype.getAll = function () {
        return this.todos;
    };
    return TodoServiceClass;
}());
//Applying Static Properties
//static = guarantee a unique value across your entire application
//global variables (var latestId = 0) : are now generally considered bad practice and to be avoided at all costs
//static variable practice is to attach it to an object, especially the function that is going to use it the most.
//
function TodoService() {
}
TodoService.lastId = 0;
TodoService.getNextId = function () {
    return TodoService.getNextId();
};
TodoService.prototype.add = function (todo) {
    var newId = TodoService.lastId += 1;
};
var TodoServiceStatic = /** @class */ (function () {
    function TodoServiceStatic(todos) {
        this.todos = todos;
    }
    TodoServiceStatic.prototype.getAll = function () {
        return this.todos;
    };
    TodoServiceStatic.getNextId = function () {
        return TodoServiceStatic.lastId += 1;
    };
    TodoServiceStatic.lastId = 0; //static property with type information and initial value
    return TodoServiceStatic;
}());
var TodoStateAccessor;
(function (TodoStateAccessor) {
    TodoStateAccessor[TodoStateAccessor["New"] = 1] = "New";
    TodoStateAccessor[TodoStateAccessor["Active"] = 2] = "Active";
    TodoStateAccessor[TodoStateAccessor["Complete"] = 3] = "Complete";
    TodoStateAccessor[TodoStateAccessor["Deleted"] = 4] = "Deleted";
})(TodoStateAccessor || (TodoStateAccessor = {}));
var SmartTodo = /** @class */ (function () {
    function SmartTodo(name) {
        this.name = name;
    }
    Object.defineProperty(SmartTodo.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (newState) {
            if (newState == TodoStateAccessor.Complete) {
                var canBeCompleted = this.state == TodoStateAccessor.Active
                    || this.state == TodoStateAccessor.Deleted;
                if (!canBeCompleted) {
                    throw "Todo must be Active or Deleted in order to be marked Completed";
                }
            }
            this._state - newState; //getter & setter has access
        },
        enumerable: false,
        configurable: true
    });
    return SmartTodo;
}());
var todo = new SmartTodo("Pick up drycleaning"); //instantiate class
todo.state = TodoStateAccessor.Complete; //set
todo.state; //get
//Inheriting behavior from Base Class
//class keyword can also introduces the ability for classes to inherit or extend 
//Inherting is use for extending or overriding
//ECMAScript 6 DO NOT support is the ability to define and inherit from abstract base classes
//TypeScript does support abstract classes
var TodoStateChanger = /** @class */ (function () {
    function TodoStateChanger(newState) {
        this.newState = newState;
    }
    TodoStateChanger.prototype.canChangeState = function (todo) {
        return !!todo;
    };
    TodoStateChanger.prototype.changeState = function (todo) {
        if (this.canChangeState(todo)) {
            todo.state = this.newState;
        }
        return todo;
    };
    return TodoStateChanger;
}());
var CompleteTodoStateChanger = /** @class */ (function (_super) {
    __extends(CompleteTodoStateChanger, _super);
    //derived class can create or not to create a constructor. It will simply inherit the constructor from base class constructor
    function CompleteTodoStateChanger() {
        var _this = 
        //derived class must call the constructor on the base class
        _super.call(this, TodoStateForBase.Complete) || this;
        _this.newState; //protected
        return _this;
    }
    //Override
    CompleteTodoStateChanger.prototype.canChangeState = function (todo) {
        return _super.prototype.canChangeState.call(this, todo) && (todo.state == TodoStateForBase.Active || todo.state == TodoStateForBase.Deleted //extending for additional logic
        );
    };
    return CompleteTodoStateChanger;
}(TodoStateChanger));
var TodoStateForBase;
(function (TodoStateForBase) {
    TodoStateForBase[TodoStateForBase["New"] = 1] = "New";
    TodoStateForBase[TodoStateForBase["Active"] = 2] = "Active";
    TodoStateForBase[TodoStateForBase["Complete"] = 3] = "Complete";
    TodoStateForBase[TodoStateForBase["Deleted"] = 4] = "Deleted";
})(TodoStateForBase || (TodoStateForBase = {}));
//Implementing Abstrac Class
var TodoStateChangerAbstract = /** @class */ (function () {
    function TodoStateChangerAbstract(newState) {
        this.newState = newState;
    }
    return TodoStateChangerAbstract;
}());
var TodoAbstract = /** @class */ (function (_super) {
    __extends(TodoAbstract, _super);
    function TodoAbstract() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TodoAbstract.prototype.canChangeState = function (todo) {
        return !!todo && (todo.state == TodoStateForBase.Active || todo.state == TodoStateForBase.Deleted //extending for additional logic
        );
    };
    return TodoAbstract;
}(TodoStateChangerAbstract));
//Controlling Visibility with Access Modifiers
//'private' keyword is an access modifier, used to hide members of a class from being accessed outside of that class
//Typescript three access modifiers to protect the members of your classes: 
//private - restrictive modifier, only methods defined on the same class definition may access that member
//protected - similar with private, but expands its definition to any classes that inherit or extend from this class
//public - least restrictive
//Javascript doesn't actually support private members
//How can Typescript support private when Javascript doesn't? 
//Javascript objects are just bags of dynamic properties, and once you add a property to the bag, that property is accessible to everyone who has access to that object
var TodoServicePrivate = /** @class */ (function () {
    function TodoServicePrivate(todos) {
        this.todos = todos;
    }
    Object.defineProperty(TodoServicePrivate.prototype, "nextId", {
        //accessrors must have the same access modifier
        get: function () {
            return TodoServicePrivate.getNextId();
        },
        set: function (nextId) {
            TodoServicePrivate._lastId = nextId - 1;
        },
        enumerable: false,
        configurable: true
    });
    TodoServicePrivate.prototype.add = function (todo) {
        var newId = this.nextId;
    };
    TodoServicePrivate.prototype.getAll = function () {
        return this.todos;
    };
    TodoServicePrivate.getNextId = function () {
        return TodoServicePrivate._lastId += 1;
    };
    TodoServicePrivate._lastId = 0; //private
    return TodoServicePrivate;
}());
var TodoServicePrivateExt = /** @class */ (function (_super) {
    __extends(TodoServicePrivateExt, _super);
    function TodoServicePrivateExt() {
        var _this = _super.call(this, TodoStateForPrivate.Complete) || this;
        _this.todos;
        return _this;
    }
    return TodoServicePrivateExt;
}(TodoServicePrivate));
var TodoStateForPrivate;
(function (TodoStateForPrivate) {
    TodoStateForPrivate[TodoStateForPrivate["New"] = 1] = "New";
    TodoStateForPrivate[TodoStateForPrivate["Active"] = 2] = "Active";
    TodoStateForPrivate[TodoStateForPrivate["Complete"] = 3] = "Complete";
})(TodoStateForPrivate || (TodoStateForPrivate = {}));
var TodoServiceInterface = /** @class */ (function () {
    function TodoServiceInterface(todos) {
        this.todos = todos;
    }
    Object.defineProperty(TodoServiceInterface.prototype, "nextId", {
        get: function () {
            return TodoServiceInterface._lastId += 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoServiceInterface.prototype, "prevId", {
        get: function () {
            return TodoServiceInterface._lastId -= 1;
        },
        enumerable: false,
        configurable: true
    });
    TodoServiceInterface.prototype.add = function (todo) {
        todo.id = this.nextId;
        this.todos.push(todo);
        return todo;
    };
    TodoServiceInterface.prototype.delete = function (todoId) {
        var toDelete = this.getById(todoId);
        var deletedIndex = this.todos.indexOf(toDelete); //get where the todo is in the array
        this.todos.splice(deletedIndex, 1); //used the index value to remove todo
    };
    TodoServiceInterface.prototype.getAll = function () {
        var clone = JSON.stringify(this.todos); //avoid manipulation vs return this.todos
        return JSON.parse(clone);
    };
    TodoServiceInterface.prototype.getById = function (todoId) {
        var filtered = this.todos.filter(function (x) { return x.id == todoId; });
        if (filtered.length) {
            return filtered[0];
        }
        return null;
    };
    TodoServiceInterface._lastId = 0;
    return TodoServiceInterface;
}());
