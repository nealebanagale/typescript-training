System.register([], function (exports_1, context_1) {
    "use strict";
    var _lastId, TodoService;
    var __moduleName = context_1 && context_1.id;
    //outside of class but encapsulated Global scope. Still accessible to any class or functions
    function generateTodoId() {
        return _lastId += 1;
    }
    return {
        setters: [],
        execute: function () {
            // namespace DataAccess {       //Switching from internal to external modules
            // import Model = TodoApp.Model;       //requires fully qualified name to refer
            _lastId = 0;
            TodoService = /** @class */ (function () {
                function TodoService(todos) {
                    this.todos = todos;
                }
                TodoService.prototype.add = function (todo) {
                    todo.id = generateTodoId();
                    this.todos.push(todo);
                    return todo;
                };
                TodoService.prototype.delete = function (todoId) {
                    var toDelete = this.getById(todoId);
                    var deletedIndex = this.todos.indexOf(toDelete);
                    this.todos.splice(deletedIndex, 1);
                };
                TodoService.prototype.getAll = function () {
                    var clone = JSON.stringify(this.todos);
                    return JSON.parse(clone);
                };
                TodoService.prototype.getById = function (todoId) {
                    var filtered = this.todos.filter(function (x) { return x.id == todoId; });
                    if (filtered.length) {
                        return filtered[0];
                    }
                    return null;
                };
                return TodoService;
            }());
            exports_1("TodoService", TodoService);
        }
    };
});
