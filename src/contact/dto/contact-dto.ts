import { PartialType } from '@nestjs/mapped-types'
import {
    IsBoolean,
    IsNotEmpty,
    IsObject,
    IsOptional,
    Length
} from 'class-validator';

export class ContactDto {

    id?: number;

    @IsNotEmpty({
        message: 'Related user must be specified.'
    })
    @IsObject({
        message: "'user' property must be an object of the type {id : number}"
    })
    user: { id: number };

    @IsNotEmpty({
        message: "'name' property is required."
    })
    @Length(3, 80, {
        message: "'name' property must be between $constraint1 and $constraint2 characters."
    })
    name: string;

    @IsOptional()
    @Length(3, 80, {
        message: "'lastname' property must be between $constraint1 and $constraint2 characters."
    })
    lastname?: string;

    @IsBoolean({
        message: "'status' property must be a boolean."
    })
    status: boolean;
}

export class UpdateContactDto extends PartialType(ContactDto) { }
