import { Site } from 'src/site/entity/site.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Admin } from 'src/admin/entity/admin.entity';
import { NoticeMessageUser } from 'src/notice/entity/notice-message-user.entity';
import { NoticeMessageBroadcastUser } from 'src/notice/entity/notice-message-boradcast-user.entity';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';
import { LogUserPoint } from 'src/log/entity/log-user-point.entity';
import { LogUserRolling } from 'src/log/entity/log-user-rolling.entity';
import { UserCommissionRate } from './user-commission-rate.entity';
import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';
import { LogAdminPoint } from 'src/log/entity/log-admin-point.entity';

@Entity()
@Unique(['identity'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Site, site => site.id)
  @JoinColumn({ name: "site_id" })
  siteId: number;

  @ManyToOne(type => Admin, admin => admin.id)
  @JoinColumn({ name: "top_id" })
  topId: number;

  @Column({ length: 20})
  identity: string;

  @Column({ length: 20})
  password: string;

  @Column({ name: 'nick_name', length: 20})
  nickname: string;

  @Column({ name: 'phone_number'})
  phoneNumber: string;

  @Column({nullable: true})
  memo: string;
    
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  point: number;

  @Column({ length: 20 })
  bank: string;

  @Column({ name: 'account_number', type: 'bigint' })
  accountNumber: number;

  @Column({ name: 'account_holder', length: 20 })
  accountHolder: string;

  @Column({ name: 'recommender_id', length: 20, nullable: true })
  recommenderId: string;

  @Column({ name: 'bonus_level', type: 'tinyint', default: 1 })
  bonusLevel: number;
  
  @Column({ name: 'betting_limit_level', type: 'tinyint', default: 1 })
  bettingLimitLevel: number;
  
  @Column({ name: 'status', type: 'tinyint', default: 0, comment: '0: 가입 승인, 1: 가입 신청, 2: 가입 대기' })
  status: number;

  @Column({ name: 'join_ip', length: 45, nullable: true })
  joinIp: string;

  @Column({ name: 'latest_ip', length: 45, nullable: true })
  latestIp: string;

  @Column({ name: 'signin_count', type : 'int', default: 0 })
  signinCount: number;
  
  @Column({ name: 'is_referer', type: 'tinyint', width: 1, default: 0 })
  isReferer: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'datetime', name: 'latest_at', nullable: true })
  latestAt: Date;
  
  @DeleteDateColumn({ name: 'blocked_at', nullable: true })
  blockedAt: string;

  @OneToOne(type => UserCommissionRate, userCommissionRate => userCommissionRate.userId)
  userCommissionRate: UserCommissionRate;

  @OneToMany(type => NoticeMessageUser, noticeMessageUser => noticeMessageUser.userId)
  noticeMessageUser: NoticeMessageUser[];

  @OneToMany(type => NoticeMessageBroadcastUser, noticeMessageBroadcastUser => noticeMessageBroadcastUser.userId )
  noticeMessageBroadcastUser: NoticeMessageBroadcastUser[];

  @OneToMany(type => LogAdminMoney, logAdminMoney => logAdminMoney.toUserId )
  logAdminMoney: LogAdminMoney[];
  
  @OneToMany(type => LogAdminPoint, logAdminPoint => logAdminPoint.toAdminId )
  logAdminPoint: LogAdminPoint[];
  
  @OneToMany(type => LogUserMoney, logUserMoney => logUserMoney.toId )
  logUserMoney: LogUserMoney[];

  @OneToMany(type => LogUserPoint, logUserPoint => logUserPoint.toId )
  logUserPoint: LogUserPoint[];

  @OneToMany(type => LogUserRolling, logUserRolling => logUserRolling.userId )
  logUserRolling: LogUserRolling[];
}