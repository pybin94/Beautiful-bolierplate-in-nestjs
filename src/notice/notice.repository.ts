import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Brackets, Like, QueryBuilder, Repository } from "typeorm";
import { NoticePopup } from './entity/notice-popup.entity';
import { NoticeAdmin } from './entity/notice-admin.entity';
import { NoticeAdminUpsertDto } from './dto/notice-admin-upsert.dto';
import { NoticeUser } from './entity/notice-user.entity';
import { NoticeUserUpsertDto } from './dto/notice-user-upsert.dto';
import { NoticePopupUpsertDto } from './dto/notice-popup-upsert.dto';
import { NoticeMessageUser } from './entity/notice-message-user.entity';
import { NoticeMessageAdmin } from './entity/notice-message-admin.entity';
import { NoticeUserMessageUpsertDto } from './dto/notice-user-message-upsert.dto';
import { NoticeMessageTemplateUpsertDto } from './dto/notice-message-template-upsert.dto';
import { NoticeMessageTemplateUser } from './entity/notice-message-template-user.entity';
import { NoticeMessageTemplateAdmin } from './entity/notice-message-template-admin.entity';
import { NoticeAdminMessageUpsertDto } from './dto/notice-admin-message-upsert.dto';

@Injectable()
export class NoticeRepository {
    constructor(
        @InjectRepository(NoticePopup)
        private readonly noticePopupRepository: Repository<NoticePopup>,

        @InjectRepository(NoticeUser)
        private readonly noticeUserRepository: Repository<NoticeUser>,

        @InjectRepository(NoticeMessageUser)
        private readonly noticeUserMessageRepository: Repository<NoticeMessageUser>,

        @InjectRepository(NoticeMessageTemplateUser)
        private readonly noticeUserMessageTemplateRepository: Repository<NoticeMessageTemplateUser>,

        @InjectRepository(NoticeAdmin)
        private readonly noticeAdminRepository: Repository<NoticeAdmin>,

        @InjectRepository(NoticeMessageAdmin)
        private readonly noticeAdminMessageRepository: Repository<NoticeMessageAdmin>,

        @InjectRepository(NoticeMessageTemplateAdmin)
        private readonly noticeAdminMessageTemplateRepository: Repository<NoticeMessageTemplateAdmin>,
    ) {};

    async noticePopupList(body: any, token: any): Promise<object> {
        
        let { limit, offset } = body;
        const noticePopup = await this.noticePopupRepository.createQueryBuilder("noticePopup")
            .where("noticePopup.siteId = :siteId", {siteId: process.env.SITE_ID})
            .orderBy('noticePopup.createdAt', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();

        return noticePopup;
    }

    async noticePopupUpsert(noticePopupUpsertDto: NoticePopupUpsertDto, token: any): Promise<object> {
        let { id, title, isSigned, isAuto, positionX, positionY, positionZ, contents, status, } = noticePopupUpsertDto;
        if (id) {
            const existingNoticePopup = await this.noticePopupRepository.findOne({where: {id}});
            existingNoticePopup.title = title;
            existingNoticePopup.contents = contents;
            existingNoticePopup.status = status;
            existingNoticePopup.isSigned = isSigned;
            existingNoticePopup.isAuto = isAuto;
            existingNoticePopup.positionX = positionX;
            existingNoticePopup.positionY = positionY;
            existingNoticePopup.positionZ = positionZ;
            await this.noticePopupRepository.save(existingNoticePopup);
            
        } else {
            await this.noticePopupRepository
                .createQueryBuilder()
                .insert()
                .values({
                    siteId: parseInt(process.env.SITE_ID),
                    status,
                    title,
                    contents,
                    isSigned,
                    isAuto,
                    positionX,
                    positionY,
                    positionZ,
                })
                .execute()
        }
        return;
    }

    async noticePopupDelete(body: any, token: any): Promise<object> {

        let { id } = body;
        await this.noticePopupRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute()
    
        return;
    }

    async noticeUserList(body: any, token: any): Promise<object> {
        
        let { limit, offset } = body;
        const FixedNoticeUser = await this.noticeUserRepository.createQueryBuilder("noticeUser")
            .where("noticeUser.siteId = :siteId", {siteId: process.env.SITE_ID})
            .andWhere({isFixed: 1})
            .orderBy('noticeUser.createdAt', 'DESC')
            .getMany();

        const noticeUser = await this.noticeUserRepository.createQueryBuilder("noticeUser")
            .where("noticeUser.siteId = :siteId", {siteId: process.env.SITE_ID})
            .andWhere({isFixed: 0})
            .orderBy('noticeUser.createdAt', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();

        return {fixed: FixedNoticeUser, normal: noticeUser};
    }

    async noticeUserUpsert(noticeUserUpsertDto: NoticeUserUpsertDto, token: any): Promise<object> {
        
        let { id, title, contents, isFixed, status, type } = noticeUserUpsertDto;
        if (id) {
            const existingNoticeUser = await this.noticeUserRepository.findOne({where: {id}});
            existingNoticeUser.title = title;
            existingNoticeUser.contents = contents;
            existingNoticeUser.status = status;
            existingNoticeUser.type = type;
            existingNoticeUser.isFixed = isFixed;
            await this.noticeUserRepository.save(existingNoticeUser);
            
        } else {
            await this.noticeUserRepository
                .createQueryBuilder()
                .insert()
                .values({
                    siteId: parseInt(process.env.SITE_ID),
                    title,
                    contents,
                    isFixed,
                    status,
                    type,
                })
                .execute()
        }
        return;
    }

    async noticeUserDelete(body: any, token: any): Promise<object> {

        let { id } = body;
        await this.noticeUserRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute()
    
        return;
    }

    async noticeUserMessageList(body: any, token: any): Promise<object> {

        let { limit, offset, direction, searchValue, searchCondition } = body;
        const queryBuilder = this.noticeUserMessageRepository.createQueryBuilder("noticeUserMessage")
            .leftJoinAndSelect("noticeUserMessage.userId", "user")
            .where("noticeUserMessage.siteId = :siteId", {siteId: process.env.SITE_ID})
            .andWhere("direction = :direction", { direction })
            .orderBy('noticeUserMessage.createdAt', 'DESC')
            .skip(offset)
            .take(limit);
            
        if(searchValue) {
            switch (searchCondition) {
                case 0:
                    queryBuilder.andWhere(new Brackets(qb => {
                        qb.where("user.identity LIKE :identity", { identity: `%${searchValue}%` })
                            .orWhere("noticeUserMessage.title LIKE :title", { title: `%${searchValue}%` })
                            .orWhere("noticeUserMessage.contents LIKE :contents", { contents: `%${searchValue}%` })
                            .orWhere("noticeUserMessage.comments LIKE :comments", { comments: `%${searchValue}%` });
                        }));
                    break;
                case 1:
                    queryBuilder.andWhere("user.identity LIKE :identity", { identity: `%${searchValue}%` });
                    break;
                case 2:
                    queryBuilder.andWhere("noticeUserMessage.title LIKE :title", { title: `%${searchValue}%` });
                    break;
                case 3:
                    queryBuilder.andWhere("noticeUserMessage.contents LIKE :contents", { contents: `%${searchValue}%` });
                    break;
                case 4:
                    queryBuilder.andWhere("noticeUserMessage.comments LIKE :comments", { comments: `%${searchValue}%` });
                    break;
            }
        }
        const noticeUserMessage = await queryBuilder.getManyAndCount();
        return noticeUserMessage;
    }

    async noticeUserMessageUpsert(noticeUserMessageUpsertDto: NoticeUserMessageUpsertDto, token: any): Promise<object> {
        let { id, playerIndex, title, contents, comments, isBroadcast, direction, status } = noticeUserMessageUpsertDto;
        if (id) {
            const existingNoticeUserMessage = await this.noticeUserMessageRepository.findOne({where: {id}});
            existingNoticeUserMessage.status = status;

            if(comments) existingNoticeUserMessage.comments = comments;
            await this.noticeUserMessageRepository.save(existingNoticeUserMessage);

        } else if (playerIndex) {
            playerIndex.forEach(async (item: number)=>{
                await this.noticeUserMessageRepository
                .createQueryBuilder()
                .insert()
                .values({
                    siteId: parseInt(process.env.SITE_ID),
                    userId: item,
                    title,
                    contents,
                    comments,
                    status,
                    isBroadcast,
                    direction,
                })
                .execute()
            })
        } else if (isBroadcast == 1) {
            await this.noticeUserMessageRepository
                .createQueryBuilder()
                .insert()
                .values({
                    siteId: parseInt(process.env.SITE_ID),
                    title,
                    contents,
                    comments,
                    status,
                    isBroadcast,
                    direction,
                })
                .execute()
        }
        return;
    }

    async noticeUserMessageDelete(body: any, token: any): Promise<object> {
        let { id } = body;
        const noticeUserMessageDelete = await this.noticeUserMessageRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute()
    
        return;
    }

    async noticeUserMessageTemplateList(body: any, token: any): Promise<object> {

        let { limit, offset } = body;
        const noticeUserMessageTemplate = await this.noticeUserMessageTemplateRepository
            .createQueryBuilder("noticeUserMessageTemplate")
            .where("noticeUserMessageTemplate.siteId = :siteId", {siteId: process.env.SITE_ID})
            .orderBy('noticeUserMessageTemplate.createdAt', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();

        return noticeUserMessageTemplate;
    }

    async noticeUserMessageTemplateUpsert(noticeMessageTemplateUpsertDto: NoticeMessageTemplateUpsertDto, token: any): Promise<object> {
        let { id, title, contents } = noticeMessageTemplateUpsertDto;
        if (id) {
            const existingNoticeUserMessageTemplate = await this.noticeUserMessageTemplateRepository.findOne({where: {id}});
            existingNoticeUserMessageTemplate.title = title;
            existingNoticeUserMessageTemplate.contents = contents;
            await this.noticeUserMessageTemplateRepository.save(existingNoticeUserMessageTemplate);

        } else {
            await this.noticeUserMessageTemplateRepository
                .createQueryBuilder()
                .insert()
                .values({
                    siteId: parseInt(process.env.SITE_ID),
                    title,
                    contents,
                })
                .execute()
        }
        return;
    }

    async noticeUserMessageTemplateDelete(body: any, token: any): Promise<object> {

        let { id } = body;
        await this.noticeUserMessageTemplateRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute()
    
        return;
    }

    async noticeAdminList(body: any, token: any): Promise<object> {
        
        let { limit, offset } = body;
        const FixedNoticeAdmin = await this.noticeAdminRepository.createQueryBuilder("noticeAdmin")
            .where("noticeAdmin.siteId = :siteId", {siteId: process.env.SITE_ID})
            .andWhere({isFixed: 1})
            .andWhere("noticeAdmin.targetLevel >= :level", { level: token.level })
            .orderBy('noticeAdmin.createdAt', 'DESC')
            .getMany();

        const noticeAdmin = await this.noticeAdminRepository.createQueryBuilder("noticeAdmin")
            .where("noticeAdmin.siteId = :siteId", {siteId: process.env.SITE_ID})
            .andWhere({isFixed: 0})
            .andWhere("noticeAdmin.targetLevel >= :level", { level: token.level })
            .orderBy('noticeAdmin.createdAt', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();

        return {fixed: FixedNoticeAdmin, normal: noticeAdmin};
    }

    async noticeAdminUpsert(noticeAdminUpsertDto: NoticeAdminUpsertDto, token: any): Promise<object> {
        
        let { id, title, contents, isFixed, targetLevel, status, } = noticeAdminUpsertDto;
        if (id) {
            const existingNoticeAdmin = await this.noticeAdminRepository.findOne({where: {id}});
            existingNoticeAdmin.title = title;
            existingNoticeAdmin.contents = contents;
            existingNoticeAdmin.status = status;
            existingNoticeAdmin.isFixed = isFixed;
            existingNoticeAdmin.targetLevel = targetLevel;
            await this.noticeAdminRepository.save(existingNoticeAdmin);
            
        } else {
            await this.noticeAdminRepository
                .createQueryBuilder()
                .insert()
                .values({
                    siteId: parseInt(process.env.SITE_ID),
                    title,
                    contents,
                    isFixed,
                    targetLevel,
                    status,
                })
                .execute()
        }
        return;
    }

    async noticeAdminDelete(body: any, token: any): Promise<object> {
        let { id } = body;

        await this.noticeAdminRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute()
    
        return;
    }

    async noticeAdminMessageList(body: any, token: any): Promise<object> {
        let { limit, offset, direction, searchValue, searchCondition } = body;
        let queryBuilder = this.noticeAdminMessageRepository.createQueryBuilder("noticeAdminMessage")
            .leftJoinAndSelect("noticeAdminMessage.receiveId", "receiveId")                
            .leftJoinAndSelect("noticeAdminMessage.sendId", "sendId")
            .where("noticeAdminMessage.siteId = :siteId", {siteId: process.env.SITE_ID})
            .orderBy('noticeAdminMessage.createdAt', 'DESC')
            .skip(offset)
            .take(limit);

        if (token.level <= 1) {
            direction == 1
            ? queryBuilder.andWhere("noticeAdminMessage.sendId IS NULL")
            : queryBuilder.andWhere("noticeAdminMessage.receiveId IS NULL");
        } else {
            direction == 1
            ? queryBuilder.andWhere("noticeAdminMessage.sendId = :sendId",{ sendId: token.id })
            : queryBuilder.andWhere("noticeAdminMessage.receiveId = :receiveId", { receiveId: token.id });
        }

        if(searchValue) {
            switch (searchCondition) {
                case 0:
                    queryBuilder.andWhere(new Brackets(qb => {
                        qb.where("user.identity LIKE :identity", { identity: `%${searchValue}%` })
                            .orWhere("noticeAdminMessage.title LIKE :title", { title: `%${searchValue}%` })
                            .orWhere("noticeAdminMessage.contents LIKE :contents", { contents: `%${searchValue}%` })
                            .orWhere("noticeAdminMessage.comments LIKE :comments", { comments: `%${searchValue}%` });
                        }));
                    break;
                case 1:
                    queryBuilder.andWhere("user.identity LIKE :identity", { identity: `%${searchValue}%` });
                    break;
                case 2:
                    queryBuilder.andWhere("noticeAdminMessage.title LIKE :title", { title: `%${searchValue}%` });
                    break;
                case 3:
                    queryBuilder.andWhere("noticeAdminMessage.contents LIKE :contents", { contents: `%${searchValue}%` });
                    break;
                case 4:
                    queryBuilder.andWhere("noticeAdminMessage.comments LIKE :comments", { comments: `%${searchValue}%` });
                    break;
            }
        }
        const noticeAdminMessage = await queryBuilder.getManyAndCount();
        return noticeAdminMessage;
    }

    async noticeAdminMessageUpsert(noticeAdminMessageUpsertDto: NoticeAdminMessageUpsertDto, token: any): Promise<object> {
        let { id, playerIndex, title, contents, comments, isBroadcast, status } = noticeAdminMessageUpsertDto;
        if (token.level == 1) {
            if (id) {
                const existingNoticeAdminMessage = await this.noticeAdminMessageRepository.findOne({where: {id}});
                existingNoticeAdminMessage.status = status;

                if(comments) existingNoticeAdminMessage.comments = comments;
                await this.noticeAdminMessageRepository.save(existingNoticeAdminMessage);

            } else if (playerIndex) {
                playerIndex.forEach(async (item: number)=>{
                    await this.noticeAdminMessageRepository
                    .createQueryBuilder()
                    .insert()
                    .values({
                        siteId: parseInt(process.env.SITE_ID),
                        receiveId: item,
                        title,
                        contents,
                        comments,
                        status: 0,
                        isBroadcast,
                    })
                    .execute()
                })
            } else if (isBroadcast == 1) {
                await this.noticeAdminMessageRepository
                    .createQueryBuilder()
                    .insert()
                    .values({
                        siteId: parseInt(process.env.SITE_ID),
                        title,
                        contents,
                        comments,
                        status: 0,
                        isBroadcast,
                    })
                    .execute()
            }
        } else if (token.level > 1) {
            if (id) {
                const existingNoticeAdminMessage = await this.noticeAdminMessageRepository.findOne({where: {id}});
                existingNoticeAdminMessage.status = status;
                await this.noticeAdminMessageRepository.save(existingNoticeAdminMessage);

            } else {
                await this.noticeAdminMessageRepository
                    .createQueryBuilder()
                    .insert()
                    .values({
                        siteId: parseInt(process.env.SITE_ID),
                        sendId: token.id,
                        title,
                        contents,
                        status: 0,
                        isBroadcast: 0,
                    })
                    .execute()
            }
        } else {
            throw "권한이 없습니다."
        }
        
        return;
    }

    async noticeAdminMessageDelete(body: any, token: any): Promise<object> {

        let { id } = body;
        await this.noticeAdminMessageRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute()
    
        return;
    }

    async noticeAdminMessageTemplateList(body: any, token: any): Promise<object> {

        let { limit, offset } = body;
        const noticeAdminMessageTemplate = await this.noticeAdminMessageTemplateRepository.createQueryBuilder("noticeAdminMessageTemplate")
            .where("noticeAdminMessageTemplate.siteId = :siteId", {siteId: process.env.SITE_ID})
            .orderBy('noticeAdminMessageTemplate.createdAt', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();

        return noticeAdminMessageTemplate;
    }

    async noticeAdminMessageTemplateUpsert(noticeMessageTemplateUpsertDto: NoticeMessageTemplateUpsertDto, token: any): Promise<object> {
        let { id, title, contents } = noticeMessageTemplateUpsertDto;
        if (id) {
            const existingNoticeAdminMessageTemplate = await this.noticeAdminMessageTemplateRepository.findOne({where: {id}});
            existingNoticeAdminMessageTemplate.title = title;
            existingNoticeAdminMessageTemplate.contents = contents;
            await this.noticeAdminMessageTemplateRepository.save(existingNoticeAdminMessageTemplate);

        } else {
            await this.noticeAdminMessageTemplateRepository
                .createQueryBuilder()
                .insert()
                .values({
                    siteId: parseInt(process.env.SITE_ID),
                    title,
                    contents,
                })
                .execute()
        }
        return;
    }

    async noticeAdminMessageTemplateDelete(body: any, token: any): Promise<object> {
        let { id } = body;
        await this.noticeAdminMessageTemplateRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute()
    
        return;
    }
}