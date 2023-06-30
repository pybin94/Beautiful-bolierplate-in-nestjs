import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Like, Not, QueryRunner, Repository, TreeRepository, getManager } from "typeorm";
import { Admin } from './entity/admin.entity';
import { AdminCommissionRate } from './entity/admin-commission-rate.entity';
import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';
import { Site } from 'src/site/entity/site.entity';
import { TransactionData } from './admin.model';
import { arrayOrder } from 'src/config/tools.config';

@Injectable()
export class AdminRepository {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        
        @InjectRepository(Site)
        private readonly siteRepository: Repository<Site>,
        
        @InjectRepository(Admin)
        private readonly adminTreeRepository: TreeRepository<Admin>,
        
        @InjectRepository(AdminCommissionRate)
        private readonly adminCommissionRateRepository: Repository<AdminCommissionRate>,

        @InjectRepository(LogAdminMoney)
        private readonly logAdminMoneyRepository: Repository<LogAdminMoney>,
    ) {};

    private adminlist = [];
    private adminTopList = [];

    async admin(body: any, token: any): Promise<object> {
        const admins = await this.adminRepository.createQueryBuilder("admin")
            .leftJoinAndSelect(
                'admin.adminCommissionRate',
                'admin_commission_rate',
                'admin.id = admin_commission_rate.adminId'
            )
            .where({siteId: parseInt(process.env.SITE_ID)})
            .andWhere({id: body.id ? body.id : token.id})
            .getOne();
        return admins;
    };

    async adminTree(body: any, token: any): Promise<object> {
        const treeRepository = this.adminTreeRepository;
        const rootNode = await treeRepository.createQueryBuilder("admin")
            .leftJoinAndSelect(
                'admin.adminCommissionRate',
                'admin_commission_rate',
                'admin.id = admin_commission_rate.adminId'
            ) 
            .where("admin.id = :id", { id: token.id })
            .getOne();

        const tree = await this.createTreeStructure(rootNode, treeRepository);
        return tree;
    };

    async createTreeStructure(node: Admin, repository: any): Promise<Admin> {
        const children = await repository.createQueryBuilder("admin")
            .leftJoinAndSelect(
                'admin.adminCommissionRate',
                'admin_commission_rate',
                'admin.id = admin_commission_rate.adminId'
            )
            .leftJoinAndSelect('admin.topId', "adminTop")
            .leftJoinAndSelect(
                'adminTop.adminCommissionRate',
                'adminTop_commission_rate',
                'adminTop.id = adminTop_commission_rate.adminId'
            )
            .where("admin.topId = :id", { id: node.id })
            .getMany();

        if (children.length === 0) {
            return node;
        };

        const childNodes = await Promise.all(children.map((child: any) => this.createTreeStructure(child, repository)));
        node.children = childNodes;
    
        return node;
    };

    async duplicateCheck(body: any, checkColumn: string): Promise<{ count: number }> {
        let setWhere: object;
        if(checkColumn == "identity" && body[checkColumn]) {
            setWhere = {identity: body[checkColumn]}
        } else if (checkColumn == "code" && body[checkColumn]){
            setWhere = {code: body[checkColumn]}
        } else {
            return {count: 1}
        }
        const duplicateCheck = await this.adminRepository.createQueryBuilder()
            .select('COUNT(*)', 'count')
            .where('admin.site_id = :siteId', { siteId: parseInt(process.env.SITE_ID) })
            .andWhere(setWhere)
            .getRawOne();

        return duplicateCheck;
    };

    async createAdmin(body: any, queryRunner: QueryRunner): Promise<object> {
        const admin = this.adminRepository.create(body);
        const adminSave = await queryRunner.manager.save(admin);
        return adminSave;
    };

    async createAdminCommitionRate(body: any, queryRunner: QueryRunner): Promise<void> {
            const adminCommissionRate = this.adminCommissionRateRepository.create(body);
            await queryRunner.manager.save(adminCommissionRate);
    };

    async admins(body: any, token: any): Promise<object> {
        let { limit, offset, searchValue, level } = body;

        const max = limit*(offset/limit+1);
        const min = (limit*(offset/limit+1)) - limit;
        const treeRepository = this.adminRepository;
        const rootNode = await treeRepository.findOne({where: {id: token.id}});

        this.adminlist = [];
        let admins: Admin[] | any[] = await this.adminStructure(rootNode, treeRepository);
        let adminArray = admins.sort(arrayOrder("createdAt"));
        let adminLength: number;

        // 검색어
        if(searchValue) {
            adminArray.forEach((item: any, index: number) => {
                if(index == 0) adminArray = [];
                if (item.topId.identity.indexOf(searchValue) > -1) {
                    adminArray = [...adminArray, item];
                };
                if (item.identity.indexOf(searchValue) > -1) {
                    adminArray = [...adminArray, item];
                };
                if (item.nickname.indexOf(searchValue) > -1) {
                    adminArray = [...adminArray, item];
                };
            });
        }
        // 에이전트 등급
        if(level) {
            admins.forEach((item: any, index: number) => {
                if(index == 0) adminArray = [];
                if(item["level"] == level){
                    adminArray = [...adminArray, item];
                };
            });
        }
        // 페이징
        if(limit) {
            adminLength = adminArray.length;
            adminArray.forEach((item: any, index: number) => {
                if(index == 0) adminArray = [];
                if(index >= min && index < max){
                    adminArray = [...adminArray, item];
                };
            });
        };

        admins = [adminArray, adminLength];

        return admins;
    };

    async adminStructure(node: any, repository: any): Promise<Admin[]> {
        const children = await repository.createQueryBuilder("admin")
            .leftJoinAndSelect(
                'admin.adminCommissionRate',
                'admin_commission_rate',
                'admin.id = admin_commission_rate.adminId'
            )
            .leftJoinAndSelect('admin.topId', "adminTop")
            .leftJoinAndSelect(
                'adminTop.adminCommissionRate',
                'adminTop_commission_rate',
                'adminTop.id = adminTop_commission_rate.adminId'
            )
            .where("admin.topId = :id", { id: node.id })
            .getMany();

        if (children.length === 0) {
            return this.adminlist;
        }
        
        await Promise.all(children.map((child: any) => this.adminStructure(child, repository)));
        this.adminlist = [...this.adminlist, ...children];
        return this.adminlist;
    };

    async updateAdmin(body: any): Promise<void> {
        let {id, bank, accountHolder, accountNumber, phoneNumber, memo, casinoRollingRate, casinoLosingRate, casinoOmittingRate, slotRollingRate, slotLosingRate, slotOmittingRate, minigameRollingRate, minigameLosingRate, minigameOmittingRate} = body;

        await this.adminRepository.createQueryBuilder("user")
            .update()
            .set({bank, accountHolder, accountNumber, phoneNumber, memo})
            .where({id})
            .execute();

        await this.adminCommissionRateRepository.createQueryBuilder()
            .update()
            .set({casinoRollingRate, casinoLosingRate, casinoOmittingRate, slotRollingRate, slotLosingRate, slotOmittingRate, minigameRollingRate, minigameLosingRate, minigameOmittingRate})
            .where({adminId: id})
            .execute();
    };

    async updateAdminPassword(body: any, token: Admin): Promise<object> {

        let {id, password, passwordConfirm} = body;
        if (password !== passwordConfirm) throw "비밀번호가 일치하지 않습니다.";
        if (!id) id = token.id;

        const updateAdmin = await this.adminRepository.createQueryBuilder("user")
            .update()
            .set({password})
            .where("id = :id", {id})
            .execute();

        return updateAdmin;
    };

    async deleteAdmin(body: any): Promise<object> {
        let { id } = body;
        const deleteAdmin = await this.adminRepository.createQueryBuilder("user")
            .softDelete()
            .where("id = :id", { id })
            .execute();

        return deleteAdmin;
    };

    async adminTop(body: any): Promise<object> {
        let { id } = body;
        this.adminTopList = []
        const adminTop = await this.admiTopnStructure(id)
        return adminTop;
    }

    async admiTopnStructure(id: number): Promise<object> {
        const topNode = await this.adminRepository.createQueryBuilder("admin")
            .leftJoinAndSelect('admin.topId', "adminTop")
            .where("admin.id = :id", { id })
            .getOne();

        if(topNode.topId) {
            this.adminTopList = [...this.adminTopList, topNode]
            return this.admiTopnStructure(topNode["topId"]["id"])
        }

        return this.adminTopList;
    }

    async adminTransaction(queryRunner: QueryRunner, transactionData: TransactionData ): Promise<object> {
            let target: any;
            switch (transactionData.status) {
                // paymentType - 입금(1), 출금(2)
                case 0: // 취소
                    if(transactionData.paymentType == 1) {
                        target = await this.logAdminMoneyRepository.findOne({where:{ id: transactionData.logId }});
                        target.status = transactionData.status

                    } else if (transactionData.paymentType == 2) {
                        // 에이전트 머니 복구
                        target = await this.adminRepository.findOne({where:{ id: transactionData.targetId }});
                        target.balance = Number(target.balance) + Number(transactionData["amount"]);
                    }
                    break;
                    
                case 1: // 신청
                    target = await this.adminRepository.findOne({where:{ id: transactionData.targetId }});
                    if(transactionData.paymentType == 2) {  
                        // 에이전트 머니 차감
                        target = await this.adminRepository.findOne({where:{ id: transactionData.targetId }});
                        if (Number(target.balance) - Number(transactionData.amount) < 0) {
                            throw "보유 금액이 부족합니다.";
                        }
                        target.balance = Number(target.balance) - Number(transactionData.amount)
                    }
                    break;

                case 2: // 대기
                    target = await this.logAdminMoneyRepository.findOne({where:{ id: transactionData.logId }});
                    target.status = transactionData.status
                    break;

                case 3: // 완료
                    if(transactionData.paymentType == 1) {   
                        // 에이전트 지급
                        target = await this.adminRepository.findOne({where:{ id: transactionData.targetId }});
                        target.balance = Number(target.balance) + Number(transactionData["amount"]);

                    } else if (transactionData.paymentType == 2) {
                        // 사이트 머니 증가
                        target = await this.siteRepository.findOne({where:{ id: parseInt(process.env.SITE_ID) }});
                        target.balance = Number(target.balance) + Number(transactionData["amount"]);
                    }
                    break;
            }
            
            if(target) {
                return await queryRunner.manager.save(target);
            } else {
                return [];
            }
    }

    async adminPayment(queryRunner: QueryRunner, paymentType: number, targetId: number, amount: number): Promise<object> {
        const target = await this.adminRepository.findOne({where:{ id: targetId }});
        switch (paymentType) {
            case 0: // 머니 증가
                target.balance = Number(target.balance) + Number(amount)
                break;
            case 1: // 머니 차감
                if (Number(target.balance) - Number(amount) < 0) {
                    throw "지급 또는 회수할 금액이 부족합니다."
                }
                target.balance = Number(target.balance) - Number(amount)
                break;
            case 2: // 포인트 증가
                target.point = Number(target.point) + Number(amount)
                break;
            case 3: // 포인트 차감
                if (Number(target.point) - Number(amount) < 0) {
                    throw "지급 또는 회수할 포인트가 부족합니다."
                }
                target.point = Number(target.point) - Number(amount)
                break;
            case 4: // 포인트 전환
                if (Number(target.point) - Number(amount) < 0) {
                    throw "전환할 포인트가 부족합니다."
                }
                target.balance = Number(target.balance) + Number(amount)
                target.point = Number(target.point) - Number(amount)
                break;
        }
        return await queryRunner.manager.save(target);
    }
} 