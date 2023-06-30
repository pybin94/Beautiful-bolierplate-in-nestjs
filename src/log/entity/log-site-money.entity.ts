import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { Admin } from "src/admin/entity/admin.entity";
import { User } from "src/user/entity/user.entity";

@Entity({name: 'log_site_money'})
@Unique(['id'])
export class LogSiteMoney {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @ManyToOne(type => Admin, admin => admin.id)
    @JoinColumn({ name: 'to_admin_id'})
    toAdminId: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: 'to_user_id'})
    toUserId: number;

    @Column({ type: 'int'})
    money: number;

    @Column({ name: 'previous_balance', type: 'decimal', precision: 12, scale: 2 })
    previousBalance: number;

    @Column({ name: 'post_balance', type: 'decimal', precision: 12, scale: 2 })
    postBalance: number;
    
    @Column({ type: 'tinyint', comment: '1: 입금, 2: 지급, 3: 회수, 4: 차감' })
    type: number;

    @Column({ name: 'transaction_type', type: 'tinyint', comment: '1: 사이트 지급, 2: 사이트 회수,' })
    transactionType: number;

    @Column({ length: 45 })
    description: string;

    @Column({ nullable: true })
    memo: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}