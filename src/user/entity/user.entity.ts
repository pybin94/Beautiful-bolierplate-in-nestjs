import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Admin } from 'src/admin/entity/admin.entity';


@Entity()
@Unique(['identity'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
}