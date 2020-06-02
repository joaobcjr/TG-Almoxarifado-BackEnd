import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { validate } from 'cnpj';

@ValidatorConstraint({ async: false })
export class ValidateCnpj implements ValidatorConstraintInterface {

    validate(text: string): boolean {
        return validate(text);
    }

    defaultMessage(): string {
        return "CNPJ inválido";
    }

}