import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id, {
        cascade: true,
        eager: true
    })
    user: User

    @Column({ type: "varchar", length: 80 })
    name: string;

    @Column({ type: "varchar", length: 80, nullable: true })
    lastName: string;

    @Column()
    status: boolean;
}