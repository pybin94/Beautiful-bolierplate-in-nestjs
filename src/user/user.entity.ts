import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['identity'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    identity: string;

    @Column()
    password: string;

    @Column()
    user_name: string;

    @Column()
    auth: string;
}