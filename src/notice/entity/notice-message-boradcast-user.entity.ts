import { Site } from "src/site/entity/site.entity";
import { User } from 'src/user/entity/user.entity';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { NoticeMessageUser } from './notice-message-user.entity';

@Entity({ name: 'notice_massage_breadcast_user' })
@Unique(['id'])
export class NoticeMessageBroadcastUser{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Site, site => site.id)
    @JoinColumn({ name: 'site_id' })
    siteId: number;

    @ManyToOne( type => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    userId: number;

    @ManyToOne( type => NoticeMessageUser, noticeMessageUser => noticeMessageUser.id)
    @JoinColumn({ name: 'notice_message_user_id' })
    NoticeMessageUserId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}