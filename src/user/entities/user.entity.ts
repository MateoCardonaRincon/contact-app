import { Contact } from "src/contact/entities/contact.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar"})
    username: string;

    @Column({ type: "varchar"})
    password: string;

    @OneToMany(() => Contact, contact => contact.user, { cascade: ["remove"], eager: true })
    @JoinColumn()
    contacts: Contact[];
}
