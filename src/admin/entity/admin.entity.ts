import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, Unique, UpdateDateColumn } from "typeorm";
import { User } from 'src/user/entity/user.entity';

@Entity()
@Unique(['id'])
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  identity: string;

  @Column({ length: 20 })
  password: string;

  @Column({ type: 'int' })
  level: number;

  @ManyToOne(type => Admin, admin => admin.id)  
  @JoinColumn({ name: "top_id" })
  topId: number;
  
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
  
  @Column({ name: 'blocked_at', nullable: true })
  blockedAt: string;

  @OneToMany(type => User, user => user.topId)
  user: User[];

  @OneToMany(type => Admin, admin => admin.topId)
  children: Admin[];
}