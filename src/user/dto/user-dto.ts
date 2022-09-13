import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, Length, MaxLength, MinLength } from "class-validator";

export class UserDto {
    
    id?: number;

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
    @MaxLength(80, {
        message: 'Password is too long. Maximal length is $constraint1 characters.'
    })
    password: string;
}

export class UpdateUserDto extends PartialType(UserDto) { }
