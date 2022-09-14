import { IsNotEmpty, IsObject, Length } from 'class-validator';

export class PhoneNumberDto {

    @IsNotEmpty({
        message: 'Related contact id must be specified'
    })
    @IsObject({
        message: "'contact' property must be an object of the type {id : number}"
    })
    contact: { id: string };

    @IsNotEmpty({
        message: "'phoneNumber' property is required."
    })
    @Length(7, 20, {
        message: "'phoneNumber' property must be between $constraint1 and $constraint2 characters."
    })
    phoneNumber: string;
}
