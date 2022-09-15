import { Contact } from "src/contact/entities/contact.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn } from "typeorm";
import { ObjectID } from 'mongodb';
@Entity()
export class PhoneNumber {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ length: 20 })
    phoneNumber: string;

    @Column(() => Contact)
    contact: Contact

}
