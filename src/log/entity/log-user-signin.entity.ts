import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { User } from "src/user/entity/user.entity";

@Entity({ name: 'log_user_signin' })
@Unique(['id'])
export class LogUserSignin {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: "user_id" })
    userId: number;

    @Column({ length: 45 })
    ip: string;

    @Column()
    domain: string;

    @Column({ nullable: true })
    memo: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}