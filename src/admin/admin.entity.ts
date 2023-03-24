import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['identity'])
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    identity: string;

    @Column()
    password: string;

    @Column()
    auth: number;

    @Column()
    user_name: string;

    @Column({nullable: true})
    set1: string;

    @Column({nullable: true})
    set2: string;

    @Column({nullable: true})
    set3: string;

    @Column({nullable: true})
    set4: string;
    
    @Column("datetime", {default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
}