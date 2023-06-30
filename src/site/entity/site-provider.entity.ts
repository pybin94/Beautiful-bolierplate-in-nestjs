import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Site } from './site.entity';
import { Provider } from 'src/provider/entity/provider.entity';

@Entity({name: 'site_provider'})
@Unique(['id'])
export class SiteProvider {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({name: 'site_id'})
    siteId: number;

    @ManyToOne(type => Provider, provider => provider.id)
    @JoinColumn({name: 'provider_id'})
    providerId: number;

    @Column({ length: 20 })
    identity: string;
    
    @Column({ length: 20 })
    password: string;
    
    @Column({ length: 20 })
    prefix: string;
    
    @Column()
    token: string;
 
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}