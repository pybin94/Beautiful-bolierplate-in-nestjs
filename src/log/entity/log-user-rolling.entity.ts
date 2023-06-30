import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { User } from "src/user/entity/user.entity";

@Entity({name: 'log_user_rolling'})
@Unique(['id'])
export class LogUserRolling {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: "user_id" })
    userId: number;

    @Column({ type: 'int'})
    point: number;

    @Column({ name: 'previous_point', type: 'decimal', precision: 12, scale: 2 })
    previousPoint: number;

    @Column({ name: 'post_point', type: 'decimal', precision: 12, scale: 2 })
    postPoint: number;

    @Column({ name: 'betting_id', type: 'tinyint', comment: '1: 입금, 2: 출금, 3: 지급, 4: 회수, 5: 롤링전환, 6: 루징전환' })
    bettingId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}