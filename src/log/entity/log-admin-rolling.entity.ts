import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { Admin } from "src/admin/entity/admin.entity";

@Entity({name: 'log_admin_rolling'})
@Unique(['id'])
export class LogAdminRolling {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: Site;

    @ManyToOne(type => Admin, admin => admin.id)
    @JoinColumn({ name: "admin_id" })
    adminId: Admin;

    @Column({ type: 'int'})
    point: number;

    @Column({ name: 'previous_point', type: 'decimal', precision: 12, scale: 2 })
    previousPoint: number;

    @Column({ name: 'post_point', type: 'decimal', precision: 12, scale: 2 })
    postPoint: number;

    @Column({ name: 'betting_id', type: 'tinyint', comment: '1: 카지노, 2: 슬롯, 3: 미니게임' })
    gameId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}