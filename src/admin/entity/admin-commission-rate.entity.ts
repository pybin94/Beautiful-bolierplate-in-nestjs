import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Admin } from './admin.entity';

@Entity({ name: 'admin_commission_rate' })
@Unique(['id'])
export class AdminCommissionRate{
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Admin, admin => admin.id)  
  @JoinColumn({ name: "admin_id" })
  adminId: number;

  @Column({ name: 'casino_rolling_rate', type: 'decimal', precision: 3, scale: 1, default: 0 })
  casinoRollingRate: number;

  @Column({ name: 'casino_losing_rate', type: 'decimal', precision: 3, scale: 1, default: 0 })
  casinoLosingRate: number;

  @Column({ name: 'casino_ommitting_rate', type: 'decimal', precision: 3, scale: 1, default: 0 })
  casinoOmittingRate: number;

  @Column({ name: 'slot_rolling_rate', type: 'decimal', precision: 3, scale: 1, default: 0 })
  slotRollingRate: number;

  @Column({ name: 'slot_losing_rate', type: 'decimal', precision: 3, scale: 1, default: 0 })
  slotLosingRate: number;

  @Column({ name: 'slot_ommitting_rate', type: 'decimal', precision: 3, scale: 1, default: 0 })
  slotOmittingRate: number;

  @Column({ name: 'minigame_rolling_rate', type: 'decimal', precision: 3, scale: 1, default: 0 })
  minigameRollingRate: number;

  @Column({ name: 'minigame_losing_rate', type: 'decimal', precision: 3, scale: 1, default: 0 })
  minigameLosingRate: number;

  @Column({ name: 'minigame_ommitting_rate', type: 'decimal', precision: 3, scale: 1, default: 0 })
  minigameOmittingRate: number;
}