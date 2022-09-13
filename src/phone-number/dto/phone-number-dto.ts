import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsObject, Length } from 'class-validator';

export class PhoneNumberDto {

    id?: number;

    @IsNotEmpty({
        message: 'Related contact id must be specified'
    })
    @IsObject({
        message: "'contact' property must be an object of the type {id : number}"
    })
    contact: { id: number };

    @IsNotEmpty({
        message: "'phoneNumber' property is required."
    })
    @Length(7, 10, {
        message: "'phoneNumber' property must be between $constraint1 and $constraint2 characters."
    })
    phoneNumber: string;
}

export class UpdatePhoneNumberDto extends PartialType(PhoneNumberDto) { }
