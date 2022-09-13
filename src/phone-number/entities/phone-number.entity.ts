import { Contact } from "src/contact/entities/contact.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PhoneNumber {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar"})
    phoneNumber: string;

    @ManyToOne(() => Contact, (contact) => contact.id, { onDelete: 'CASCADE' })
    contact: Contact

}
