import { Contact } from "src/contact/entities/contact.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PhoneNumber {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Contact)
    contact: Contact

    @Column("varchar", { length: 80 })
    phoneNumber: string;

}
