import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectID } from 'mongodb';

@Entity()
export class Contact {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ length: 80 })
    name: string;

    @Column({ nullable: true, length: 80 })
    lastname: string;

    @Column()
    status: boolean;

    @Column()
    userId: ObjectID;
}