import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { User } from "src/user/entity/user.entity";
import { Admin } from "src/admin/entity/admin.entity";

@Entity({name: 'log_user_point'})
@Unique(['id'])
export class LogUserPoint {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @ManyToOne(type => Admin, admin => admin.id)
    @JoinColumn({ name: 'from_id' })
    fromId: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: 'to_id' })
    toId: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    point: number;

    @Column({ name: 'previous_point', type: 'decimal', precision: 12, scale: 2 })
    previousPoint: number;

    @Column({ name: 'post_point', type: 'decimal', precision: 12, scale: 2 })
    postPoint: number;

    @Column({ type: 'tinyint', comment: '1: 롤링, 2: 루징, 3: 기타, 4: 신규첫충, 5: 당일첫충, 6: 매충' })
    type: number;

    @Column({ name: 'transaction_type', type: 'tinyint', comment: '1: 에이전트 지급, 2: 에이전트 회수, 3: 포인트 전환' })
    transactionType: number;

    @Column({ length: 45 })
    description: string;

    @Column({ nullable: true })
    memo: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}