import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectID } from 'mongodb';
@Entity()
export class PhoneNumber {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ length: 20 })
    phoneNumber: string;

    @Column()
    contactId: ObjectID;

}
