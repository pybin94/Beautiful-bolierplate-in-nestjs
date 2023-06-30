import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Provider } from './provider.entity';
import { ProviderThirdpartySite } from './provider-thirdparty-site.entity';
import { LogUserThirdpartyMoney } from "src/log/entity/log-user-thirdparty-money.entity";

@Entity({name: 'provider_thirdparty'})
@Unique(['id'])
export class ProviderThirdparty {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Provider, provider => provider.id)
    @JoinColumn({ name: "provider_id" })
    providerId: number;

    @Column({ length: 45 })
    name: string;

    @Column({name: 'name_en', length: 45 })
    nameEn: string;
    
    @Column({ comment: '게임사 게임 접속 코드(CODE) 또는 키(KEY)' })
    code: string;

    @Column({ type: 'int', comment: '1: 카지노, 2: 슬롯, 3: 호텔 카지노' })
    type: number;

    @Column({ name: 'is_lobby', type: 'int', comment: '게임사 로비 사용 여부 - 0: 미사용, 1: 사용' })
    isLobby: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(type => ProviderThirdpartySite, providerThirdpartySite => providerThirdpartySite.providerThirdpartyId)
    providerThirdpartySite: ProviderThirdpartySite[];

    @OneToMany(type => LogUserThirdpartyMoney, logUserThirdpartyMoney => logUserThirdpartyMoney.providerThirdpartyId)
    logUserThirdpartyMoney: LogUserThirdpartyMoney[];
}