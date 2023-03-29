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
    meno: string;
    
    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        transformer: {
          from: (value: Date) => value.toLocaleString('ko-KR', {
            dateStyle: "medium",
            timeStyle: "medium",
            hour12: false,
            timeZone: 'Asia/Seoul'
          }),
          to: (value: string) => new Date(value),
        },
    })
    created_at: Date;
}