import { Column, Entity, Index, ObjectIdColumn, Unique } from "typeorm";
import { ObjectID } from 'mongodb';

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ length: 80 })
    username: string;

    @Column({ length: 80 })
    password: string;
}
