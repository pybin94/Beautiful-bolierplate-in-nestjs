import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dateFormat } from 'src/config/log.tools.config';
import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class TransactionRepository {
    constructor(
        @InjectRepository(LogUserMoney)
        private readonly logUserMoneyRepository: Repository<LogUserMoney>,
        @InjectRepository(LogAdminMoney)
        private readonly logAdminMoneyRepository: Repository<LogAdminMoney>,
    ) {};

    async userTransaction(body: any, transactionType: number): Promise<object> {
        let { limit, offset } = body;

        const selectAdminTransaction = await this.logUserMoneyRepository.createQueryBuilder("logUserMoney")
            .leftJoinAndSelect("logUserMoney.toId", "user")
            .leftJoinAndSelect("user.topId", "topId")
            .where({siteId: process.env.SITE_ID})
            .andWhere(
                new Brackets(qb => {
                qb.where("logUserMoney.status = :status1", { status1: 1 })
                    .orWhere("logUserMoney.status = :status2", { status2: 2 });
            }))
            .andWhere({transactionType}) // 1: 입금, 2: 출금
            .orderBy('logUserMoney.id', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();

        return selectAdminTransaction;
    }

    async userTransactionHistory(body: any): Promise<object> {
        let { limit, offset, searchValue, startDate, endDate } = body;

        startDate = dateFormat(startDate);
        endDate = dateFormat(endDate);

        const queryBuilder = this.logUserMoneyRepository.createQueryBuilder("logUserMoney")
            .leftJoinAndSelect("logUserMoney.toId", "user")
            .leftJoinAndSelect("user.topId", "topId")
            .where({siteId: process.env.SITE_ID})
            .andWhere('logUserMoney.updatedAt BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            })
            .andWhere(
                new Brackets(qb => {
                qb.where("logUserMoney.status = :status1", { status1: 0 })
                    .orWhere("logUserMoney.status = :status2", { status2: 3 });
            }))
            .andWhere(
                new Brackets(qb => {
                qb.where("logUserMoney.transactionType = :transactionType1", { transactionType1: 1 })
                    .orWhere("logUserMoney.transactionType = :transactionType2", { transactionType2: 2 });
            }))
            .orderBy('logUserMoney.updatedAt', 'DESC')
            .skip(offset)
            .take(limit)

            if(searchValue) {
                queryBuilder.andWhere(new Brackets(qb => {
                    qb.where("user.identity LIKE :identity", { identity: `%${searchValue}%` })
                        .orWhere("user.nickname LIKE :nickname", { nickname: `%${searchValue}%` })
                }));
            }

            const selectAdminTransactionHistory = await queryBuilder.getManyAndCount();

        return selectAdminTransactionHistory;
    }

    async adminTransaction(body: any, transactionType: number): Promise<object> {
        let { limit, offset } = body;

        const selectAdminTransaction = await this.logAdminMoneyRepository.createQueryBuilder("logAdminMoney")
            .leftJoinAndSelect('logAdminMoney.fromId', "admin")
            .leftJoinAndSelect("admin.topId", "topId")
            .where({siteId: process.env.SITE_ID})
            .andWhere(
                new Brackets(qb => {
                qb.where("logAdminMoney.status = :status1", { status1: 1 })
                    .orWhere("logAdminMoney.status = :status2", { status2: 2 });
            }))
            .andWhere({transactionType}) // 1: 입금, 2: 출금
            .orderBy('logAdminMoney.id', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();

        return selectAdminTransaction;
    }

    async adminTransactionHistory(body: any): Promise<object> {
        let { limit, offset, searchValue, startDate, endDate } = body;

        startDate = dateFormat(startDate);
        endDate = dateFormat(endDate);

        const queryBuilder = this.logAdminMoneyRepository.createQueryBuilder("logAdminMoney")
            .leftJoinAndSelect('logAdminMoney.fromId', "admin")
            .leftJoinAndSelect("admin.topId", "topId")
            .where({siteId: process.env.SITE_ID})
            .andWhere('logAdminMoney.updatedAt BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            })
            .andWhere(
                new Brackets(qb => {
                qb.where("logAdminMoney.status = :status1", { status1: 0 })
                    .orWhere("logAdminMoney.status = :status2", { status2: 3 });
            }))
            .andWhere(
                new Brackets(qb => {
                qb.where("logAdminMoney.transactionType = :transactionType1", { transactionType1: 1 })
                    .orWhere("logAdminMoney.transactionType = :transactionType2", { transactionType2: 2 });
            }))
            .orderBy('logAdminMoney.updatedAt', 'DESC')
            .skip(offset)
            .take(limit)

            if(searchValue) {
                queryBuilder.andWhere(new Brackets(qb => {
                    qb.where("admin.identity LIKE :identity", { identity: `%${searchValue}%` })
                        .orWhere("admin.nickname LIKE :nickname", { nickname: `%${searchValue}%` })
                }));
            }

            const selectAdminTransactionHistory = await queryBuilder.getManyAndCount();

        return selectAdminTransactionHistory;
    }  

    async userTransactionAlert(body: any, transactionType: number): Promise<object> {
        const selectAdminTransactionAlert = await this.logUserMoneyRepository.createQueryBuilder("logUserMoney")
            .leftJoinAndSelect('logUserMoney.fromId', "admin")
            .leftJoinAndSelect("logUserMoney.toId", "user")
            .where({siteId: process.env.SITE_ID})
            .andWhere({status: 1})
            .andWhere({transactionType}) // 1: 입금, 2: 출금
            .getOne();

        return selectAdminTransactionAlert;
    }

    async adminTransactionAlert(body: any, transactionType: number): Promise<object> {
        const selectAdminTransactionAlert = await this.logAdminMoneyRepository.createQueryBuilder("logAdminMoney")
            .leftJoinAndSelect('logAdminMoney.fromId', "admin")
            .leftJoinAndSelect("logAdminMoney.toAdminId", "toAdmin")
            .leftJoinAndSelect("logAdminMoney.toUserId", "toUser")
            .where({siteId: process.env.SITE_ID})
            .andWhere({status: 1})
            .andWhere({transactionType}) // 1: 입금, 2: 출금
            .getOne();

        return selectAdminTransactionAlert;
    }
}
