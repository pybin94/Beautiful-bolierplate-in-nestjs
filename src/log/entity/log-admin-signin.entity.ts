import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { Admin } from "src/admin/entity/admin.entity";

@Entity({ name: 'log_admin_signin' })
@Unique(['id'])
export class LogAdminSignin {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @ManyToOne(type => Admin, admin => admin.id)
    @JoinColumn({ name: "admin_id" })
    adminId: number;

    @Column({ length: 45 })
    ip: string;

    @Column({ nullable: true })
    memo: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}