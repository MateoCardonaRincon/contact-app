import { Contact } from "src/contact/entities/contact.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PhoneNumber {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 20 })
    phoneNumber: string;

    @ManyToOne(() => Contact, (contact) => contact.id, { onDelete: 'CASCADE' })
    contact: Contact

}
