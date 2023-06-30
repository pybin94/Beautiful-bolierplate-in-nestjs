import { Site } from "src/site/entity/site.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'notice_message_user' })
@Unique(['id'])
export class NoticeMessageUser{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Site, site => site.id)
    @JoinColumn({ name: 'site_id' })
    siteId: number;

    @ManyToOne( type => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    userId: number;

    @Column({ length: 45 })
    title: string;

    @Column({ type: 'mediumtext' })
    contents: string;

    @Column({ type: 'mediumtext', nullable: true })
    comments: string;

    @Column({ type: 'tinyint', comment: '1: 에이전트 -> 플레이어, 2: 플레이어 -> 에이전트'})
    direction: number;

    @Column({ type: 'tinyint', comment: '0: 메시지전송, 1: 메시지확인, 2: 답변전송, 3: 답변확인' })
    status: number;

    @Column({ name: 'is_broadcast', type: 'tinyint', comment: '0: 일반, 1: 전체', default: 0 })
    isBroadcast: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}