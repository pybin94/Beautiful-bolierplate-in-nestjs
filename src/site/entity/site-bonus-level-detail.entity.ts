import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Site } from 'src/site/entity/site.entity';

@Entity({name: 'site_bonus_level_detail'})
@Unique(['id'])
export class SiteBonusLevelDetail {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @Column({ type: "tinyint" })
    level: number;
    
    @Column({ name:"first_bonus_limit", type: "int", comment: "첫충 최대", default: 0 })
    firstBonusLimit: number;

    @Column({ name:"new_bonus_limit", type: "int", comment: "신규 최대", default: 0 })
    newBonusLimit: number;

    @Column({ name:"every_bonus_limit", type: "int", comment: "매충 최대", default: 0 })
    everyBonusLimit: number;

    @Column({ name:"daily_bonus_limit", type: "int", comment: "일일 최대", default: 0 })
    dailyBonusLimit: number;

    @Column({ name:"first_deposit_rate", type: "tinyint", comment: "첫충 %", default: 0 })
    firstDepositRate: number;

    @Column({ name:"every_deposit_rate", type: "tinyint", comment: "매충 %", default: 0 })
    everyDepositRate: number;

    @Column({ name:"new_deposit_rate", type: "tinyint", comment: "신규 %", default: 0 })
    newDepositRate: number;
}