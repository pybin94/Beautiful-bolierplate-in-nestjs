import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'user_commission_rate' })
@Unique(['id'])
export class UserCommissionRate{
  @PrimaryGeneratedColumn()
  id: number;
 
  @OneToOne(type => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'casino_rolling_rate', type: 'tinyint', default: 0 })
  casinoRollingRate: number;

  @Column({ name: 'casino_losing_rate', type: 'tinyint', default: 0 })
  casinoLosingRate: number;
 
  @Column({ name: 'slot_rolling_rate', type: 'tinyint', default: 0 })
  slotRollingRate: number;

  @Column({ name: 'slot_losing_rate', type: 'tinyint', default: 0 })
  slotLosingRate: number;

  @Column({ name: 'minigame_rolling_rate', type: 'tinyint', default: 0 })
  minigameRollingRate: number;

  @Column({ name: 'minigame_losing_rate', type: 'tinyint', default: 0 })
  minigameLosingRate: number;
}