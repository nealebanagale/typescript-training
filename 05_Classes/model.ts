interface ITodoService {
    add(todo: TodoForInterface) : TodoForInterface;
    delete(todoId: number) : void;
    getAll() : TodoForInterface[];
    getById(todoId: number) : TodoForInterface;
}

interface TodoForInterface {
    id: number;
    name: string;s
    state: TodoStateForInterface;
}

enum TodoStateForInterface {
    New = 1,
    Active,
    Complete,
}