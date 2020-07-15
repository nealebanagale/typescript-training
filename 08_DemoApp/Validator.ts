import { Todo, TodoState } from './Model';

@validatetable      //decorator
//class decorator
export class ValidatetableTodo implements Todo {           //implements Todo interface
    id: number;             //prototype member is accessible
    @required               //property decorator
    @regex(`^[a-zA-Z ]*$`)  //decorator factory
    name: string;
    state: TodoState;
}

export interface ValidatetableTodo extends IValidatetable {}

export interface IValidatetable {
    validate() : IValidationResult;
}

export interface IValidationResult {
    isValid: boolean;
    messagge: string;
    property? : string;
}

export interface IValidator {
    (instance: Object) : IValidationResult;
}

export function validate() : IValidationResult[] {
    //logic for validation
    let validators : IValidator[] = [].concat(this._validators),
        errors: IValidationResult[] = [];

    for (let validator of validators) {
        let result = validator(this);
        if (!result.isValid) {
            errors.push(result);
        }
    }
    return errors;
        
}

export function validatetable(target: Function) {
    target.prototype.validate = validate;
}

//Property decorator
export function required (target: Object, propertyName: string) {    
    //logic in property
    let validateable = <{ _validators: IValidator[] }>target,
        validators = validateable._validators;
    //additional property handling
}

export function regex(pattern: string) {
    let expression = new RegExp(pattern);
    //decorator factory : function that returns a decorator function
    return function regex(target: Object, propertyName:  string) {
        //full access to any of the parameters passed into the director factory function itself
        //additional property handling
    }
}