import { SiteProvider } from 'src/site/entity/site-provider.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { ProviderThirdparty } from './provider-thirdparty.entity';

@Entity()
@Unique(['id'])
export class Provider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    name: string;

    @Column({})
    url: string;
    
    @Column({ type: 'tinyint' })
    status: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'created_at' })
    updated_at: Date;

    @OneToMany(type => SiteProvider, siteProvider => siteProvider.providerId)
    siteProvider: SiteProvider[];

    @OneToMany(type => ProviderThirdparty, providerThirdparty => providerThirdparty.providerId)
    providerThirdparty: ProviderThirdparty[];
}