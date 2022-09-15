import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    Length
} from 'class-validator';

export class ContactDto {

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

    @IsNotEmpty({
        message: "'userId' property is required."
    })
    userId: string;
}
