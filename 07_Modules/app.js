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
System.register(["./Model", "./DataAccess"], function (exports_1, context_1) {
    "use strict";
    var jQuery, Model_1, todo, DataAccess_1, service, todos;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Model_1_1) {
                Model_1 = Model_1_1;
            },
            function (DataAccess_1_1) {
                DataAccess_1 = DataAccess_1_1;
            }
        ],
        execute: function () {//!!putting all of your code in the global namespace == BAD!
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
            jQuery = {
                version: 1.19,
                fn: {} //attach custom functions
            };
            //IIFE functions
            (function defineType($) {
                if ($.version < 1.15)
                    throw 'Plugin requires jQuery version 1.15+';
                $.fn = function () {
                    // my plugin code
                };
            })(jQuery); //IFI / follow the function with a set of parentheses - executes the function
            service = new DataAccess_1.TodoService([]);
            service.add({
                id: 1,
                name: 'Pick up drycleaning',
                state: Model_1.TodoStateNamespace.New
            });
            todos = service.getAll();
            todos.forEach(function (todo) {
                return console.log(todo.name + " [" + Model_1.TodoStateNamespace[todo.state] + "]");
            });
        }
    };
});
