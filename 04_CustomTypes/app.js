/**
 * TypeScript can go above and beyond the types that JavaScript provides out of the box and define custom types
 * that describe the data structures and behavior that your application uses
 *
 * TypeScript offers three ways to define a custom type:
 * interfaces
 * classes
 * enums
 */
// var todo = <Todo>{}; //casting syntax
var todo2 = {
    name: "Pick up drycleaning"
};
var $ = function (selector) {
    //find DOM element
};
$.version = 1.12;
$.fn.todo = function (todo) {
    if (todo) {
        $(this).data('todo', todo);
    }
    else {
        return $(this).data('todo');
    }
};
var todo = { name: 'Pick up drycleaning' };
var container = $('#container'); //jquery function to get an element
container.data('todo', todo); //used data method to assign the todo object to the DOM element's data property named 'todo'. 
var savedTodo = container.data('todo'); //used overload of the data method to extract the value set
var TodoState;
(function (TodoState) {
    TodoState[TodoState["New"] = 1] = "New";
    TodoState[TodoState["Active"] = 2] = "Active";
    TodoState[TodoState["Completed"] = 3] = "Completed";
    TodoState[TodoState["Deleted"] = 4] = "Deleted";
})(TodoState || (TodoState = {}));
var newTodo = {
    name: "Pick up drycleanig",
    state: 1
};
function deleteTodo(todo) {
    if (todo.state != TodoState.New) {
        throw "Can't delete incomplete";
    }
}
//Anonymous Type
//Rather than define the whole interface with just one property, define the type right inline 
var todoAny;
todoAny = { age: 41 };
function totalLength(x, y) {
    var total = x.length + y.length;
    return total;
}
