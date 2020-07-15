//Namespaces are an excellent way to avoid naming collisions and refer to a group of types as one organizational unit. 
//Hide from Global scope
//export - a keyword to use types outside of the scope

export  interface TodoNameNamespace {
    id: number;
    name: string;
    state: TodoStateNamespace;
}
export enum TodoStateNamespace {
    New = 1,
    Active,
    Completed,
    Deleted
}

