import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    user: User

    @Column("varchar", { length: 80 })
    name: string;

    @Column("varchar", { length: 80 })
    lastName: string;

    @Column("boolean")
    status: boolean;
}