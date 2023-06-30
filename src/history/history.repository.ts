import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from 'src/admin/admin.repository';
import { dateFormat } from 'src/config/log.tools.config';
import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';
import { LogAdminPoint } from 'src/log/entity/log-admin-point.entity';
import { LogSiteMoney } from 'src/log/entity/log-site-money.entity';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';
import { LogUserPoint } from 'src/log/entity/log-user-point.entity';
import { LogUserThirdpartyMoney } from 'src/log/entity/log-user-thirdparty-money.entity';
import { UserRepository } from 'src/user/user.repository';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class HistoryRepository {
    constructor(
        @InjectRepository(LogUserMoney)
        private readonly logUserMoneyRepository: Repository<LogUserMoney>,
        @InjectRepository(LogUserPoint)
        private readonly logUserPointRepository: Repository<LogUserPoint>,
        @InjectRepository(LogAdminMoney)
        private readonly logAdminMoneyRepository: Repository<LogAdminMoney>,
        @InjectRepository(LogAdminPoint)
        private readonly logAdminPointRepository: Repository<LogAdminPoint>,
        @InjectRepository(LogSiteMoney)
        private readonly logSiteMoneyRepository: Repository<LogSiteMoney>,
        @InjectRepository(LogUserThirdpartyMoney)
        private readonly logUserThirdpartyMoney: Repository<LogUserThirdpartyMoney>,

        private readonly adminRepository: AdminRepository,
        
        private readonly userRepository: UserRepository,
    ) {}

    async userMoneyTransaction(body: any, token: any): Promise<object> {
        let { limit, offset, searchValue, startDate, endDate } = body;

        let underIds = [];
        let userIds = [];
        startDate = dateFormat(startDate);
        endDate = dateFormat(endDate);

        const admins = await this.adminRepository.admins({}, token)
        admins[0].forEach((item: object, index: number)=>{
            underIds = [...underIds, item["id"]]
        })

        const users = await this.userRepository.users({}, token)
        users[0].forEach((item: object, index: number)=>{
            userIds = [...userIds, item["id"]]
        })

        const queryBuilder = this.logUserMoneyRepository.createQueryBuilder("logUserMoney")
            .leftJoinAndSelect('logUserMoney.fromId', "admin")
            .leftJoinAndSelect("logUserMoney.toId", "user")
            .where({siteId: process.env.SITE_ID})
            .andWhere('logUserMoney.updatedAt BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            })
            .orderBy('logUserMoney.updatedAt', 'DESC')
            .skip(offset)
            .take(limit)
        
        if(token.level > 1) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where('logUserMoney.fromId IN (:...underIds)', { underIds: [token.id, ...underIds]})
                    .orWhere('logUserMoney.toId IN (:...userIds)', { userIds: [...userIds]})
            }));
        };

        if(searchValue) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where("admin.identity LIKE :adminIdentity", { adminIdentity: `%${searchValue}%` })
                    .orWhere("user.nickname LIKE :nickname", { nickname: `%${searchValue}%` })
                    .orWhere("user.identity LIKE :userIdentity", { userIdentity: `%${searchValue}%` })
            }));
        };

        const userMoneyTransactionList = await queryBuilder.getManyAndCount();
        return userMoneyTransactionList;
    }

    async userPointTransaction(body: any, token: any): Promise<object> {
        let { limit, offset, searchValue, startDate, endDate } = body;

        let underIds = [];
        let userIds = [];
        startDate = dateFormat(startDate);
        endDate = dateFormat(endDate);

        const admins = await this.adminRepository.admins({}, token)
        admins[0].forEach((item: object, index: number)=>{
            underIds = [...underIds, item["id"]]
        })

        const users = await this.userRepository.users({}, token)
        users[0].forEach((item: object, index: number)=>{
            userIds = [...userIds, item["id"]]
        })

        const queryBuilder = this.logUserPointRepository.createQueryBuilder("logUserPoint")
            .leftJoinAndSelect('logUserPoint.fromId', "admin")
            .leftJoinAndSelect("logUserPoint.toId", "user")
            .where({siteId: process.env.SITE_ID})
            .andWhere('logUserPoint.createdAt BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            })
            .orderBy('logUserPoint.createdAt', 'DESC')
            .skip(offset)
            .take(limit)
        
        if(token.level > 1) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where('logUserPoint.fromId IN (:...underIds)', { underIds: [token.id, ...underIds]})
                    .orWhere('logUserPoint.toId IN (:...userIds)', { userIds: [...userIds]})
            }));
        }

        if(searchValue) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where("admin.identity LIKE :adminIdentity", { adminIdentity: `%${searchValue}%` })
                    .orWhere("user.nickname LIKE :nickname", { nickname: `%${searchValue}%` })
                    .orWhere("user.identity LIKE :userIdentity", { userIdentity: `%${searchValue}%` })
            }));
        }
        const userPointTransactionList = await queryBuilder.getManyAndCount();
        return userPointTransactionList;
    }

    async adminMoneyTransaction(body: any, token: any): Promise<object> {
        let { limit, offset, searchValue, startDate, endDate } = body;
        
        let underIds = [];
        let userIds = [];
        startDate = dateFormat(startDate);
        endDate = dateFormat(endDate);

        const admins = await this.adminRepository.admins({}, token)
        admins[0].forEach((item: object, index: number)=>{
            underIds = [...underIds, item["id"]]
        })

        const users = await this.userRepository.users({}, token)
        users[0].forEach((item: object, index: number)=>{
            userIds = [...userIds, item["id"]]
        })

        const queryBuilder = this.logAdminMoneyRepository.createQueryBuilder("logAdminMoney")
            .leftJoinAndSelect('logAdminMoney.fromId', "admin")
            .leftJoinAndSelect("logAdminMoney.toAdminId", "toAdmin")
            .leftJoinAndSelect("logAdminMoney.toUserId", "toUser")
            .where({siteId: process.env.SITE_ID})
            .andWhere('logAdminMoney.createdAt BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            })
            .orderBy('logAdminMoney.updatedAt', 'DESC')
            .skip(offset)
            .take(limit)

        if(token.level > 1) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where('logAdminMoney.fromId IN (:...fromId)', { fromId: [token.id, ...underIds]})
                    .orWhere('logAdminMoney.toAdminId IN (:...toAdminId)', { toAdminId: [token.id, ...underIds]})
                    .orWhere('logAdminMoney.toUserId IN (:...toUserId)', { toUserId: [...userIds]})
            }));
        }

        if(searchValue) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where("admin.identity LIKE :adminIdentity", { adminIdentity: `%${searchValue}%` })
                    .orWhere("toAdmin.identity LIKE :toIdentity", { toIdentity: `%${searchValue}%` })
                    .orWhere("toUser.identity LIKE :fromIdentity", { fromIdentity: `%${searchValue}%` })
            }));
        }
        const adminMoneyTransactionList = await queryBuilder.getManyAndCount();
        return adminMoneyTransactionList;
    }

    async adminPointTransaction(body: any, token: any): Promise<object> {
        let { limit, offset, searchValue, startDate, endDate } = body;

        let underIds = [];
        let userIds = [];
        startDate = dateFormat(startDate);
        endDate = dateFormat(endDate);

        const admins = await this.adminRepository.admins({}, token)
        admins[0].forEach((item: object, index: number)=>{
            underIds = [...underIds, item["id"]]
        })

        const users = await this.userRepository.users({}, token)
        users[0].forEach((item: object, index: number)=>{
            userIds = [...userIds, item["id"]]
        })

        const queryBuilder =  this.logAdminPointRepository.createQueryBuilder("logAdminPoint")
            .leftJoinAndSelect('logAdminPoint.fromId', "admin")
            .leftJoinAndSelect("logAdminPoint.toAdminId", "toAdmin")
            .leftJoinAndSelect("logAdminPoint.toUserId", "toUser")
            .where({siteId: process.env.SITE_ID})
            .andWhere('logAdminPoint.createdAt BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            })
            .orderBy('logAdminPoint.createdAt', 'DESC')
            .skip(offset)
            .take(limit)

        if(token.level > 1) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where('logAdminPoint.fromId IN (:...fromId)', { fromId: [token.id, ...underIds]})
                    .orWhere('logAdminPoint.toAdminId IN (:...toAdminId)', { toAdminId: [token.id, ...underIds]})
                    .orWhere('logAdminPoint.toUserId IN (:...toUserId)', { toUserId: [...userIds]})
            }));
        }
        
        if(searchValue) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where("admin.identity LIKE :identity", { identity: `%${searchValue}%` })
                    .orWhere("toAdmin.identity LIKE :identity", { identity: `%${searchValue}%` })
                    .orWhere("toUser.identity LIKE :identity", { identity: `%${searchValue}%` })
            }));
        }

        const adminPointTransactionList = await queryBuilder.getManyAndCount();
        return adminPointTransactionList;
    }

    async siteMoneyTransaction(body: any): Promise<object> {
        let { limit, offset, searchValue, startDate, endDate } = body;

        startDate = dateFormat(startDate);
        endDate = dateFormat(endDate);

        const queryBuilder = this.logSiteMoneyRepository.createQueryBuilder("log_site_money")
            .leftJoinAndSelect("log_site_money.toAdminId", "admin")
            .leftJoinAndSelect("log_site_money.toUserId", "user")
            .where({siteId: process.env.SITE_ID})
            .andWhere('log_site_money.createdAt BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            })
            .orderBy('log_site_money.createdAt', 'DESC')
            .skip(offset)
            .take(limit)

        if(searchValue) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where("admin.identity LIKE :identity", { identity: `%${searchValue}%` })
                    .orWhere("user.identity LIKE :identity", { identity: `%${searchValue}%` })
            }));
        }

        const siteMoneyTransactionList = await queryBuilder.getManyAndCount();
        return siteMoneyTransactionList;
    }

    async userThirdpartyTransaction(body: any): Promise<object> {
        let { limit, offset, searchValue, startDate, endDate } = body;

        startDate = dateFormat(startDate);
        endDate = dateFormat(endDate);

        const queryBuilder = this.logUserThirdpartyMoney.createQueryBuilder("log_site_money")
            .leftJoinAndSelect("log_site_money.userId", "user")
            .leftJoinAndSelect("log_site_money.providerThirdpartyId", "provider")
            .where({siteId: process.env.SITE_ID})
            .andWhere('log_site_money.createdAt BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            })
            .orderBy('log_site_money.createdAt', 'DESC')
            .skip(offset)
            .take(limit)

        if(searchValue) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where("user.identity LIKE :identity", { identity: `%${searchValue}%` })
                    .orWhere("user.nickname LIKE :nickname", { nickname: `%${searchValue}%` })
                    .orWhere("provider.name LIKE :name", { name: `%${searchValue}%` })
            }));
        }

        const userThirdpartyList = await queryBuilder.getManyAndCount();
        return userThirdpartyList;
    }
}