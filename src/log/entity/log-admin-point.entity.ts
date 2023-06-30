import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { Admin } from "src/admin/entity/admin.entity";
import { User } from "src/user/entity/user.entity";

@Entity({name: 'log_admin_point'})
@Unique(['id'])
export class LogAdminPoint {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @ManyToOne(type => Admin, admin => admin.id)
    @JoinColumn({ name: 'from_id' })
    fromId: number;

    @ManyToOne(type => Admin, toAdmin => toAdmin.id)
    @JoinColumn({ name: 'to_admin_id' })
    toAdminId: number;

    @ManyToOne(type => User, toUser => toUser.id)
    @JoinColumn({ name: 'to_user_id' })
    toUserId: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    point: number;

    @Column({ name: 'previous_point', type: 'decimal', precision: 12, scale: 2 })
    previousPoint: number;

    @Column({ name: 'post_point', type: 'decimal', precision: 12, scale: 2 })
    postPoint: number;

    @Column({ type: 'tinyint', comment: '1: 롤링, 2: 루징, 3: 기타' })
    type: number;

    @Column({ name: 'transaction_type', type: 'tinyint', comment: '1: 상위 에이전트 지급, 2: 상위 에이전트 회수, 3: 하위 에이전트 지급, 4: 하위 에이전트 회수, 5: 플레이어 지급, 6: 플레이어 회수, 7: 포인트 전환' })
    transactionType: number;

    @Column({ length: 45 })
    description: string;

    @Column({ nullable: true })
    memo: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}