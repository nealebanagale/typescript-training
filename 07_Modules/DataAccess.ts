import Model = require('./Model');  //importing using CommonJS syntax =  'require'
// namespace DataAccess {       //Switching from internal to external modules
// import Model = TodoApp.Model;       //requires fully qualified name to refer
let _lastId: number = 0;

//outside of class but encapsulated Global scope. Still accessible to any class or functions
export interface ITodoService {                                                
    add(todo: Model.TodoNameNamespace) : Model.TodoNameNamespace;
    delete(todoId: number) : void;
    getAll(): Model.TodoNameNamespace[];
    getById(todoId: number) : Model.TodoNameNamespace;
}

//outside of class but encapsulated Global scope. Still accessible to any class or functions
function generateTodoId() {
    return _lastId += 1;
}

export class TodoService implements ITodoService {

    constructor(private todos: Model.TodoNameNamespace[]) {
    }

    add(todo: Model.TodoNameNamespace): Model.TodoNameNamespace {
        todo.id = generateTodoId();

        this.todos.push(todo);

        return todo;
    }

    delete(todoId: number): void {
        var toDelete = this.getById(todoId);

        var deletedIndex = this.todos.indexOf(toDelete);

        this.todos.splice(deletedIndex, 1);
    }

    getAll(): Model.TodoNameNamespace[] {
        var clone = JSON.stringify(this.todos);
        return JSON.parse(clone);
    }

    getById(todoId: number): Model.TodoNameNamespace {
        var filtered =
            this.todos.filter(x => x.id == todoId);

        if (filtered.length) {
            return filtered[0];
        }

        return null;
    }
}