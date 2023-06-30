import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { Admin } from "src/admin/entity/admin.entity";
import { User } from "src/user/entity/user.entity";

@Entity({name: 'log_user_money'})
@Unique(['id'])
export class LogUserMoney {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @ManyToOne(type => Admin, admin => admin.id)
    @JoinColumn({ name: "from_id" })
    fromId: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: "to_id" })
    toId: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    money: number;

    @Column({ name: 'previous_balance', type: 'decimal', precision: 12, scale: 2, nullable: true })
    previousBalance: number;

    @Column({ name: 'post_balance', type: 'decimal', precision: 12, scale: 2, nullable: true })
    postBalance: number;

    @Column({ name: 'transaction_type', type: 'tinyint', comment: '1: 입금, 2: 출금, 3: 에이전트 지급, 4: 에이전트 회수, 5: 포인트 전환' })
    transactionType: number;
    
    @Column({ type: 'tinyint', comment: '0: 취소, 1: 신청, 2: 대기, 3: 완료' })
    status: number;

    @Column({ length: 45 })
    description: string;

    @Column({ nullable: true })
    memo: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}