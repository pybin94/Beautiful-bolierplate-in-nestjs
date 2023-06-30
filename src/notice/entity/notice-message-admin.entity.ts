import { Admin } from "src/admin/entity/admin.entity";
import { Site } from "src/site/entity/site.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { NoticeMessageBroadcastAdmin } from "./notice-message-boradcast-admin.entity";

@Entity({ name: 'notice_message_admin' })
@Unique(['id'])
export class NoticeMessageAdmin{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Site, site => site.id)
    @JoinColumn({ name: 'site_id' })
    siteId: number;

    @ManyToOne( type => Admin, admin => admin.id)
    @JoinColumn({ name: 'send_id' })
    sendId: number;

    @ManyToOne( type => Admin, admin => admin.id)
    @JoinColumn({ name: 'receive_id' })
    receiveId: number;

    @Column({ length: 45 })
    title: string;

    @Column({ type: 'mediumtext' })
    contents: string;

    @Column({ type: 'mediumtext', nullable: true })
    comments: string;

    @Column({ type: 'tinyint', comment: '0: 메시지전송, 1: 메시지확인, 2: 답변전송, 3: 답변확인' })
    status: number;

    @Column({ name: 'is_broadcast', type: 'tinyint', default: 0 })
    isBroadcast: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
    @OneToMany(type => NoticeMessageBroadcastAdmin, noticeMessageBroadcastAdmin => noticeMessageBroadcastAdmin.NoticeMessageAdminId )
    noticeMessageBroadcastAdmin: NoticeMessageBroadcastAdmin[];
}