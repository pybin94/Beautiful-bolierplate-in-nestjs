import { now } from './../config/tools.config';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
    user_name: string;
    
    @Column({ type: 'int' })
    auth: number;

    @Column({nullable: true})
    set1: string;

    @Column({nullable: true})
    set2: string;

    @Column({nullable: true})
    memo: string;
    
    @Column({
      type: 'datetime',
      transformer: {
        from: (value: Date) => value.toLocaleString('ko-KR', {
          dateStyle: "medium",
          timeStyle: "medium",
          hour12: false,
          timeZone: 'Asia/Seoul'
        }),
        to: (value: string) => new Date(value),
      },
      // default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: string = now;

}