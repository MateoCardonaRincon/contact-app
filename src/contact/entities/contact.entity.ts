import { PhoneNumber } from './../../phone-number/entities/phone-number.entity';
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar", nullable: true })
    lastname: string;

    @Column()
    status: boolean;

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    user: User

    @OneToMany(type => PhoneNumber, phoneNumber => phoneNumber.contact, { cascade: ["remove"], eager: true })
    @JoinColumn()
    phoneNumbers: PhoneNumber[];
}