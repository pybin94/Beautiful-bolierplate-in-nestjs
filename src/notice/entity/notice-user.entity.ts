import { Site } from "src/site/entity/site.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'notice_user' })
@Unique(['id'])
export class NoticeUser{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Site, site => site.id)
    @JoinColumn({ name: 'site_id' })
    siteId: number;

    @Column({ length: 45 })
    title: string;

    @Column({ type: 'mediumtext' })
    contents: string;

    @Column({ name: 'is_fixed', type: 'tinyint', comment: '0: 일반, 1: 고정' })
    isFixed: number;
    
    @Column({ type: 'tinyint', comment: '0: 숨김, 1: 보임' })
    status: number;

    @Column({ type: 'tinyint', comment: '0: 공지, 1: 이벤트' })
    type: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}