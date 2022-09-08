import { Contact } from "src/contact/entities/contact.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PhoneNumber {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Contact, (contact) => contact.id, {
        cascade: true,
        eager: true
    })
    contact: Contact

    @Column({ type: "varchar", length: 80 })
    phoneNumber: string;

}
