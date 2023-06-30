import { ProviderThirdparty } from 'src/provider/entity/provider-thirdparty.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { User } from "src/user/entity/user.entity";

@Entity({name: 'betting_casino'})
export class bettingCasino {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    userId: number;

    @ManyToOne(type => ProviderThirdparty, providerThirdparty => providerThirdparty.id)
    @JoinColumn({ name: 'provider_thirdparty_id' })
    providerThirdpartyId: number;

    @Column({ name: 'transaction_id', unique: true })
    transactionId: string;

    @Column({ name: 'transaction_type', type: 'int', comment: '1: bet+win 2: bet 3: win' })
    transactionType: number;

    @Column({ name: 'selected_bet', default: 0, comment: '0: 정보없음, 1: 벵커, 2: 플레이어, 3: 타이' })
    selectedBet: number;

    @Column({ name: 'bet_amount', type: 'int' })
    betAmount: number;

    @Column({ name: 'result_amount', type: 'int' })
    resultAmount: number;

    @Column({ name: 'valid_amount', type: 'int' })
    validAmount: number;

    @Column({ name: 'bet_result' })
    betResult: string;

    @Column({ name: 'is_calculated', type: 'tinyint', default: 0, comment: '정산 여부 - 0: 미정산, 1: 정산완료, 2: 누락' })
    isCalculated: number;

    @Column({ name: 'game_name' })
    gameName: string;

    @Column({ name: 'banker_card', nullable: true })
    bankerCard: string;

    @Column({ name: 'player_card', nullable: true })
    playerCard: string;

    @Column({ name: 'win_side', nullable: true })
    winSide: string;

    @Column({ name: 'betting_at' })
    bettingAt: string;

    @Column({ name: 'calculated_at', nullable: true })
    calculatedAt: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}