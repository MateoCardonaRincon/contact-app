import { IsNotEmpty, IsObject, Length } from 'class-validator';

export class PhoneNumberDto {

    @IsNotEmpty({
        message: "'phoneNumber' property is required."
    })
    @Length(7, 20, {
        message: "'phoneNumber' property must be between $constraint1 and $constraint2 characters."
    })
    phoneNumber: string;

    @IsNotEmpty({
        message: "'contactId' property is required."
    })
    contactId: string;
}
