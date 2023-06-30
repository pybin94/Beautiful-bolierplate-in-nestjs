import { IpWhitelist } from './ip-whitelist.entity';
import { IpBlacklist } from './ip-blacklist.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Admin } from 'src/admin/entity/admin.entity';
import { SiteProvider } from './site-provider.entity';
import { NoticePopup } from 'src/notice/entity/notice-popup.entity';
import { NoticeAdmin } from 'src/notice/entity/notice-admin.entity';
import { NoticeUser } from 'src/notice/entity/notice-user.entity';
import { NoticeMessageUser } from 'src/notice/entity/notice-message-user.entity';
import { NoticeMessageAdmin } from 'src/notice/entity/notice-message-admin.entity';
import { NoticeMessageBroadcastAdmin } from 'src/notice/entity/notice-message-boradcast-admin.entity';
import { NoticeMessageBroadcastUser } from 'src/notice/entity/notice-message-boradcast-user.entity';
import { ProviderThirdpartySite } from 'src/provider/entity/provider-thirdparty-site.entity';
import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';
import { LogAdminPoint } from 'src/log/entity/log-admin-point.entity';
import { LogSiteMoney } from 'src/log/entity/log-site-money.entity';
import { LogAdminRolling } from 'src/log/entity/log-admin-rolling.entity';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';
import { LogUserPoint } from 'src/log/entity/log-user-point.entity';
import { LogUserRolling } from 'src/log/entity/log-user-rolling.entity';
import { LogUserSignin } from 'src/log/entity/log-user-signin.entity';
import { LogAdminSignin } from 'src/log/entity/log-admin-signin.entity';
import { SiteBonusLevelDetail } from './site-bonus-level-detail.entity';
import { NoticeMessageTemplateAdmin } from 'src/notice/entity/notice-message-template-admin.entity';
import { NoticeMessageTemplateUser } from 'src/notice/entity/notice-message-template-user.entity';

@Entity()
@Unique(['id'])
export class Site {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    name: string;

    @Column({ name: 'balance' })
    balance: number;

    @Column({ name: "casino_rolling_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 })
    casinoRollingRateMax: number;

    @Column({ name: "casino_losing_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 })
    casinoLosingRateMax: number;

    @Column({ name: "casino_omitting_rate_max",  type: 'decimal', precision: 3, scale: 1, default: 10 })
    casinoOmittingRateMax: number;

    @Column({ name: "slot_rolling_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 })
    slotRollingRateMax: number;

    @Column({ name: "slot_losing_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 })
    slotLosingRateMax: number;

    @Column({ name: "slot_omitting_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 })
    slotOmittingRateMax: number;

    @Column({ name: "minigame_rolling_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 })
    minigameRollingRateMax: number;

    @Column({ name: "minigame_losing_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 })
    minigameLosingRateMax: number;

    @Column({ name: "minigame_omitting_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 })
    minigameOmittingRateMax: number;

    @Column({ name:"first_bonus_limit", type: "int", default: 0, comment: "첫충 최대" })
    firstBonusLimit: number;

    @Column({ name:"new_bonus_limit", type: "int", default: 0, comment: "신규 최대" })
    newBonusLimit: number;

    @Column({ name:"every_bonus_limit", type: "int", default: 0, comment: "매충 최대" })
    everyBonusLimit: number;

    @Column({ name:"daily_bonus_limit", type: "int", default: 0, comment: "일일 최대" })
    dailyBonusLimit: number;

    @Column({ name:"first_deposit_rate", type: "tinyint", default: 0, comment: "첫충 %" })
    firstDepositRate: number;

    @Column({ name:"every_deposit_rate", type: "tinyint", default: 0, comment: "매충 %" })
    everyDepositRate: number;

    @Column({ name:"new_deposit_rate", type: "tinyint", default: 0, comment: "신규 %" })
    newDepositRate: number;

    @Column({ name: "is_enabled_casino", type: 'tinyint', default: 1, comment: '0: 비활성화, 1: 활성화' })
    isEnabledCasino: number;

    @Column({ name: "is_enabled_slot", type: 'tinyint', default: 1, comment: '0: 비활성화, 1: 활성화' })
    isEnabledSlot: number;

    @Column({ name: "is_enabled_minigame", type: 'tinyint', default: 1, comment: '0: 비활성화, 1: 활성화' })
    isEnabledMinigame: number;

    @Column({ name: "is_enabled_whitelist", type: 'tinyint', default: 0, comment: '0: 비활성화, 1: 활성화' })
    isEnabledWhitelist: number;

    @Column({ name: "is_enabled_bonus_level", type: 'tinyint', default: 1, comment: '0: 비활성화, 1: 활성화, 2: 레벨 사용' })
    isEnabledBonusLevel: number;

    @Column({ name: "is_enabled_telegram", type: 'tinyint', default: 1, comment: '0: 비활성화, 1: 활성화' })
    isEnabledTelegram: number;

    @Column({ name: "telegram_id", nullable: true })
    telegramId: string;

    @Column({ name: "is_enabled_inspection", type: 'tinyint', default: 0, comment: '0: 비활성화, 1: 활성화' })
    isEnabledInspection: number;

    @Column({ name: "inspection_message", nullable: true, comment: '점검 문구' })
    inspectionMessage: string;

    @Column({ nullable: true })
    memo: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(type => User, user => user.siteId)
    user: User[];

    @OneToMany(type => Admin, admin => admin.siteId)
    admin: Admin[];

    @OneToMany(type => SiteProvider, siteProvider => siteProvider.siteId)
    siteProvider: SiteProvider[];

    @OneToMany(type => SiteBonusLevelDetail, siteBonusLevelDetail => siteBonusLevelDetail.siteId)
    siteBonusLevelDetail: SiteBonusLevelDetail[];

    @OneToMany(type => ProviderThirdpartySite, providerThirdpartySite => providerThirdpartySite.siteId)
    providerThirdpartySite: ProviderThirdpartySite[];

    @OneToMany(type => IpBlacklist, ipBlacklist => ipBlacklist.siteId)
    ipBlacklist: IpBlacklist[];

    @OneToMany(type => IpWhitelist, ipWhitelist => ipWhitelist.siteId)
    ipWhitelist: IpWhitelist[];

    @OneToMany(type => NoticePopup, noticePopup => noticePopup.siteId)
    noticePopup: NoticePopup[];

    @OneToMany(type => NoticeAdmin, noticeAdmin => noticeAdmin.siteId)
    noticeAdmin: NoticeAdmin[];

    @OneToMany(type => NoticeUser, noticeUser => noticeUser.siteId)
    noticeUser: NoticeUser[];

    @OneToMany(type => NoticeMessageUser, noticeMessageUser => noticeMessageUser.siteId)
    noticeMessageUser: NoticeMessageUser[];

    @OneToMany(type => NoticeMessageAdmin, noticeMessageUser => noticeMessageUser.siteId)
    noticeMessageAdmin: NoticeMessageAdmin[];

    @OneToMany(type => NoticeMessageTemplateUser, noticeMessageTemplateUser => noticeMessageTemplateUser.siteId)
    noticeMessageTemplateUser: NoticeMessageTemplateUser[];

    @OneToMany(type => NoticeMessageTemplateAdmin, noticeMessageTemplateAdmin => noticeMessageTemplateAdmin.siteId)
    noticeMessageTemplateAdmin: NoticeMessageTemplateAdmin[];
    
    @OneToMany(type => NoticeMessageBroadcastUser, noticeMessageBroadcastUser => noticeMessageBroadcastUser.siteId )
    noticeMessageBroadcastUser: NoticeMessageBroadcastUser[];

    @OneToMany(type => NoticeMessageBroadcastAdmin, noticeMessageBroadcastAdmin => noticeMessageBroadcastAdmin.siteId )
    noticeMessageBroadcastAdmin: NoticeMessageBroadcastAdmin[];

    @OneToMany(type => LogAdminMoney, logAdminMoney => logAdminMoney.siteId)
    logAdminMoney: LogAdminMoney[];

    @OneToMany(type => LogAdminPoint, logAdminPoint => logAdminPoint.siteId)
    logAdminPoint: LogAdminPoint[];

    @OneToMany(type => LogAdminRolling, logAdminRolling => logAdminRolling.siteId)
    logAdminRolling: LogAdminRolling[];

    @OneToMany(type => LogUserMoney, logUserMoney => logUserMoney.siteId)
    logUserMoney: LogUserMoney[];

    @OneToMany(type => LogUserPoint, logUserPoint => logUserPoint.siteId)
    logUserPoint: LogUserPoint[];

    @OneToMany(type => LogUserRolling, logUserRolling => logUserRolling.siteId)
    logUserRolling: LogUserRolling[];

    @OneToMany(type => LogSiteMoney, logSiteMoney => logSiteMoney.siteId)
    logSiteMoney: LogSiteMoney[];

    @OneToMany(type => LogAdminSignin, logAdminSignin => logAdminSignin.siteId)
    logAdminSignin: LogAdminSignin[];

    @OneToMany(type => LogUserSignin, logUserSignin => logUserSignin.siteId)
    logUserSignin: LogUserSignin[];
}