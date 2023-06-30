import { Site } from "src/site/entity/site.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'notice_admin' })
@Unique(['id'])
export class NoticeAdmin{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Site, site => site.id)
    @JoinColumn({ name: 'site_id' })
    siteId: number;

    @Column({ length: 45 })
    title: string;

    @Column({ type: 'mediumtext' })
    contents: string;

    @Column({ name: 'target_level', type: 'tinyint', comment: '99: 전체' })
    targetLevel: number;

    @Column({ name: 'is_fixed', type: 'tinyint', comment: '0: 일반, 1: 고정' })
    isFixed: number;
    
    @Column({ type: 'tinyint', comment: '0: 숨김, 1: 보임' })
    status: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}