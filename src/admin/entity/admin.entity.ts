import { Site } from 'src/site/entity/site.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, Unique, UpdateDateColumn } from "typeorm";
import { User } from 'src/user/entity/user.entity';
import { NoticeMessageAdmin } from 'src/notice/entity/notice-message-admin.entity';
import { NoticeMessageBroadcastAdmin } from 'src/notice/entity/notice-message-boradcast-admin.entity';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';
import { LogAdminRolling } from 'src/log/entity/log-admin-rolling.entity';
import { LogAdminPoint } from 'src/log/entity/log-admin-point.entity';
import { LogAdminSignin } from 'src/log/entity/log-admin-signin.entity';
import { AdminCommissionRate } from './admin-commission-rate.entity';
import { LogUserPoint } from 'src/log/entity/log-user-point.entity';
import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';

@Entity()
@Unique(['id'])
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Site, site => site.id)  
  @JoinColumn({ name: "site_id" })
  siteId: number;

  @Column({ length: 20 })
  identity: string;

  @Column({ length: 20 })
  password: string;

  @Column({ name: 'nick_name', length: 20})
  nickname: string;

  @Column({ name: 'phone_number'})
  phoneNumber: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  balance: number;

  @Column({ name: 'point', type: 'decimal', precision: 12, scale: 2, default: 0 })
  point: number;

  @Column({ type: 'int' })
  level: number;

  @Column({ length: 20 })
  code: string;

  @ManyToOne(type => Admin, admin => admin.id)  
  @JoinColumn({ name: "top_id" })
  topId: number;
  
  @Column({ length: 20 })
  bank: string;

  @Column({ name: 'account_number', type: 'bigint' })
  accountNumber: number;

  @Column({ name: 'account_holder', length: 20 })
  accountHolder: string;

  @Column({ name: 'join_ip', length: 45, nullable: true })
  joinIp: string;
  
  @Column({ name: 'latest_ip', length: 45, nullable: true })
  latestIp: string;
  
  @Column({ nullable: true })
  memo: string;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'latest_at', nullable: true })
  latestAt: string;
  
  @DeleteDateColumn({ name: 'blocked_at', nullable: true })
  blockedAt: string;

  @OneToOne(type => AdminCommissionRate, adminCommissionRate => adminCommissionRate.adminId)
  adminCommissionRate: AdminCommissionRate;

  @OneToMany(type => User, user => user.topId)
  user: User[];

  @OneToMany(type => NoticeMessageAdmin, noticeMessageAdmin => { noticeMessageAdmin.sendId, noticeMessageAdmin.receiveId })
  noticeMessageAdmin: NoticeMessageAdmin[];

  @OneToMany(type => NoticeMessageBroadcastAdmin, noticeMessageBroadcastAdmin => noticeMessageBroadcastAdmin.adminId )
  noticeMessageBroadcastAdmin: NoticeMessageBroadcastAdmin[];

  @OneToMany(type => LogAdminMoney, logAdminMoney => logAdminMoney.toAdminId )
  logAdminMoney: LogAdminMoney[];

  @OneToMany(type => LogAdminPoint, logAdminPoint => logAdminPoint.fromId )
  logAdminPoint: LogAdminPoint[];

  @OneToMany(type => LogAdminPoint, logToAdminPoint => logToAdminPoint.toAdminId )
  logToAdminPoint: LogAdminPoint[];

  @OneToMany(type => LogAdminRolling, logAdminRolling => logAdminRolling.adminId )
  logAdminRolling: LogAdminRolling[];

  @OneToMany(type => LogAdminSignin, logAdminSignin => logAdminSignin.adminId )
  logAdminSignin: LogAdminSignin[];

  @OneToMany(type => LogUserMoney, logUserMoney => logUserMoney.fromId )
  logUserMoney: LogUserMoney[];

  @OneToMany(type => LogUserPoint, logUserPoint => logUserPoint.fromId )
  logUserPoint: LogUserPoint[];

  @OneToMany(type => Admin, admin => admin.topId)
  children: Admin[];
}