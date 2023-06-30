import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { ProviderThirdparty } from './provider-thirdparty.entity';
import { Site } from 'src/site/entity/site.entity';

@Entity({name: 'provider_thirdparty_site'})
@Unique(['id'])
export class ProviderThirdpartySite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @ManyToOne(type => ProviderThirdparty, providerThirdparty => providerThirdparty.id)
    @JoinColumn({ name: "provider_thirdparty_id" })
    providerThirdpartyId: number;

    @Column({ type: 'tinyint', comment: '0: 비활성화, 1: 활성화', default: 1 })
    status: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'datetime',
        name: 'updated_at',
        nullable: true,
    })
    updatedAt: Date;
}