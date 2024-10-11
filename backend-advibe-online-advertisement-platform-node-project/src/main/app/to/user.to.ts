import {IsEmail, IsNotEmpty, Matches, MinLength} from "class-validator";

// add class validator decorators to validate the field
export class UserTo {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @MinLength(2)
    name!: string;

    @IsNotEmpty()
    @Matches(/^0\d{2}-\d{7}$/) // 011-1234567
    contact!: string;
}