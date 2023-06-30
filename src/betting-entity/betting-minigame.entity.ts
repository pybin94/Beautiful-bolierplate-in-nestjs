import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Site } from 'src/site/entity/site.entity';
import { User } from "src/user/entity/user.entity";

@Entity({name: 'betting_minigame'})
@Unique(['id'])
export class bettingMinigame {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Site, site => site.id)
    @JoinColumn({ name: "site_id" })
    siteId: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    userId: number;

    @Column({ name: 'minigame_id' })
    minigameId: string;

    @Column({ type: 'int' })
    round: number;

    @Column({ name: 'day_round', type: 'int' })
    dayRound: number;

    @Column({ name: 'selected_bet' })
    selectedBet: number;

    @Column({ name: 'bet_amount', type: 'int' })
    betAmount: number;

    @Column({ name: 'result_amount', type: 'int' })
    resultAmount: number;

    @Column({ name: 'valid_amount', type: 'int' })
    valid_amount: number;

    @Column({ name: 'bet_result' })
    betResult: string;

    @Column({ name: 'is_calculated', type: 'tinyint', comment: '정산 여부 - 0: 미정산, 1: 정산완료, 2: 누락' })
    isCalculated: number;

    @Column({ name: 'game_result' })
    gameResult: string;

    @Column({ name: 'betting_at' })
    bettingAt: string;

    @Column({ name: 'calculated_at', nullable: true })
    calculatedAt: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}