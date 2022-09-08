import { User } from "src/user/entities/user.entity";

import { PartialType } from '@nestjs/mapped-types'

export class ContactDto {
    id?: number;
    user: { id: number };
    name: string;
    lastName?: string;
    status: boolean;
}

export class UpdateContactDto extends PartialType(ContactDto) {
    
}
