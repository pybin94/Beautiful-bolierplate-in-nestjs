import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { now } from "src/config/tools.config";

@Entity({name: 'ip_whitelist'})
@Unique(['id'])
export class IpWhitelist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 45})
    ip: string;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @Column({ nullable: true })
    memo: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}