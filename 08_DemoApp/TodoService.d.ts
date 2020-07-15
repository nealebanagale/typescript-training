import { Todo } from './Model';
export interface ITodoService {
    add(todo: Todo): Todo;
    add(todo: string): Todo;
    clearCompleted(): void;
    getAll(): Todo[];
    getById(todoId: number): Todo;
    toggle(todoId: number): void;
}
export default class TodoService implements ITodoService {
    private todos;
    constructor(todos: any);
    add(todo: Todo): Todo;
    add(todo: String): Todo;
    clearCompleted(): void;
    getAll(): Todo[];
    getById(todoId: number): Todo;
    toggle(todoId: number): void;
    private _find;
}
