import { Contact } from "src/contact/entities/contact.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", unique: true, length: 80 })
    username: string;

    @Column({ type: "varchar", length: 80 })
    password: string;

    @OneToMany(() => Contact, contact => contact.user, { cascade: ["remove"], eager: true })
    @JoinColumn()
    contacts: Contact[];
}
