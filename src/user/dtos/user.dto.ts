import { IsNotEmpty, Length, MaxLength, MinLength } from "class-validator";

export class UserDto {

    @IsNotEmpty({
        message: "'username' property is required."
    })
    @Length(3, 80, {
        message: "'username' property must be between $constraint1 and $constraint2 characters."
    })
    username: string;

    @MinLength(8, {
        message: 'Password is too short. At least $constraint1 characters are required.'
    })
    @MaxLength(50, {
        message: 'Password is too long. Maximal length is $constraint1 characters.'
    })
    password: string;
}