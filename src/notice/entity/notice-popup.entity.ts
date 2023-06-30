import { Site } from "src/site/entity/site.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'notice_popup' })
@Unique(['id'])
export class NoticePopup{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Site, site => site.id)
    @JoinColumn({ name: 'site_id' })
    siteId: number;

    @Column({ length: 45 })
    title: string;

    @Column({ type: 'mediumtext' })
    contents: string;

    @Column({ name: 'status', type: 'tinyint',})
    status: number;

    @Column({ name: 'is_signed', type: 'tinyint', comment: '0: 로그인, 1: 전체'})
    isSigned: number;

    @Column({ name: 'is_auto', type: 'tinyint', comment: '0: 수동, 1: 자동'})
    isAuto: number;

    @Column({ name: 'position_x', type: 'int'})
    positionX: number;
    
    @Column({ name: 'position_y', type: 'int'})
    positionY: number;

    @Column({ name: 'position_z', type: 'int'})
    positionZ: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}