import { NoticeMessageAdmin } from './notice-message-admin.entity';
import { Admin } from "src/admin/entity/admin.entity";
import { Site } from "src/site/entity/site.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'notice_massage_breadcast_admin' })
@Unique(['id'])
export class NoticeMessageBroadcastAdmin{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Site, site => site.id)
    @JoinColumn({ name: 'site_id' })
    siteId: number;

    @ManyToOne( type => Admin, admin => admin.id)
    @JoinColumn({ name: 'admin_id' })
    adminId: number;

    @ManyToOne( type => NoticeMessageAdmin, noticeMessageAdmin => noticeMessageAdmin.id)
    @JoinColumn({ name: 'notice_message_admin_id' })
    NoticeMessageAdminId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}