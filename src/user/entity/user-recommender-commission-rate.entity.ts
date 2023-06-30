import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'user_recommender_commission_rate' })
@Unique(['id'])
export class UserRecommenderCommissionRate{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.id)  
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'casino_rolling_rate', type: 'decimal', precision: 3, scale: 1 })
  casinoRollingRate: number;

  @Column({ name: 'casino_losing_rate', type: 'decimal', precision: 3, scale: 1 })
  casinoLosingRate: number;

  @Column({ name: 'slot_rolling_rate', type: 'decimal', precision: 3, scale: 1 })
  slotRollingRate: number;

  @Column({ name: 'slot_losing_rate', type: 'decimal', precision: 3, scale: 1 })
  slotLosingRate: number;

  @Column({ name: 'minigame_rolling_rate', type: 'decimal', precision: 3, scale: 1 })
  minigameRollingRate: number;

  @Column({ name: 'minigame_losing_rate', type: 'decimal', precision: 3, scale: 1 })
  minigameLosingRate: number;
}