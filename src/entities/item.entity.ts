import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Item {
    @PrimaryGeneratedColumn('uuid') /* 空にした場合数字の連番となる */
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    status: string;


    @Column()
    createAt: string;

    @Column()
    updatedAt: string;

    @ManyToOne(()=> User, (user) => user.items)
    user: User;

    @Column()
    userId: string;
}