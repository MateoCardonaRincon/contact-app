import { Contact } from "src/contact/entities/contact.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 80 })
    username: string;

    @Column({ type: "varchar", length: 80 })
    password: string;

    @OneToMany(type => Contact, contact => contact.user)
    contacts: Contact[];  
}
