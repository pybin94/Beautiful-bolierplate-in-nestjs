import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { User } from "src/user/entity/user.entity";
import { ProviderThirdparty } from "src/provider/entity/provider-thirdparty.entity";

@Entity({name: 'log_user_thirdparty_money'})
@Unique(['id'])
export class LogUserThirdpartyMoney {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: "user_id" })
    userId: number;

    @ManyToOne(type => ProviderThirdparty, providerThirdparty => providerThirdparty.id)
    @JoinColumn({ name: "provider_thirdparty_id" })
    providerThirdpartyId: string;

    @Column({ name: "provider_thirdparty_game_name", nullable: true })
    providerThirdpartyGameName: string;

    @Column({ name: "user_balance", type: 'decimal', precision: 12, scale: 2 })
    userBalance: number;

    @Column({ name: "provider_balance", type: 'decimal', precision: 12, scale: 2 })
    providerBalance: number;

    @Column({ name: "total_Balance",type: 'decimal', precision: 12, scale: 2 })
    totalBalance: number;

    @Column({ type: 'tinyint', comment: '1: 플레이어->게임사, 2: 게임사->플레이어' })
    type: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}