//Namespaces are an excellent way to avoid naming collisions and refer to a group of types as one organizational unit. 
//Hide from Global scope
//export - a keyword to use types outside of the scope
System.register([], function (exports_1, context_1) {
    "use strict";
    var TodoStateNamespace;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {//Namespaces are an excellent way to avoid naming collisions and refer to a group of types as one organizational unit. 
            //Hide from Global scope
            //export - a keyword to use types outside of the scope
            (function (TodoStateNamespace) {
                TodoStateNamespace[TodoStateNamespace["New"] = 1] = "New";
                TodoStateNamespace[TodoStateNamespace["Active"] = 2] = "Active";
                TodoStateNamespace[TodoStateNamespace["Completed"] = 3] = "Completed";
                TodoStateNamespace[TodoStateNamespace["Deleted"] = 4] = "Deleted";
            })(TodoStateNamespace || (TodoStateNamespace = {}));
            exports_1("TodoStateNamespace", TodoStateNamespace);
        }
    };
});
