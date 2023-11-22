import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Brackets, QueryRunner, Repository, TreeRepository } from "typeorm";
import { Admin } from './entity/admin.entity';
import { nowDate } from 'src/config/tools.config';

@Injectable()
export class AdminRepository {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        
        @InjectRepository(Admin)
        private readonly adminTreeRepository: TreeRepository<Admin>,
    ) {};

    private adminlist = [];
    private adminTopList = [];

    async admin(body: any, token: any): Promise<object> {
        const admins = await this.adminRepository.createQueryBuilder("admin")
            .leftJoinAndSelect('admin.topId', 'adminTop')
            .andWhere({id: body.id ? body.id : token.id})
            .getOne();
        return admins;
    };
    async adminTree(body: any, token: any): Promise<object> {
        const treeRepository = this.adminTreeRepository;
        const rootNode = await treeRepository.createQueryBuilder("admin")
            .where("admin.id = :id", { id: token.id })
            .getOne();

        const tree = await this.createTreeStructure(rootNode, treeRepository);
        return tree;
    };

    async createTreeStructure(node: Admin, repository: any): Promise<Admin> {
        const children = await repository.createQueryBuilder("admin")
            .leftJoinAndSelect('admin.topId', "adminTop")
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
            .andWhere(setWhere)
            .getRawOne();

        return duplicateCheck;
    };

    async createAdmin(body: any, queryRunner: QueryRunner): Promise<object> {
        const admin = this.adminRepository.create(body);
        const adminSave = await queryRunner.manager.save(admin);
        return adminSave;
    };

    async admins(body: any, token: any): Promise<object> {
        let { limit, offset, searchValue, level, orderBy } = body;

        if(!limit) {
            limit = 0
            offset = 0
        }

        const queryBuilder = this.adminRepository.createQueryBuilder("admin")
            .leftJoinAndSelect('admin.topId', "adminTop")
            .where('admin.level > :level', { level: token.level})
            .andWhere("admin.blockedAt IS NULL")
            .orderBy('admin.createdAt', 'DESC')
            .skip(offset)
            .take(limit)

        if(token.level > 1) {
            let underIds = [];

            const admins = await this.adminIds(token)
            admins.map((item: object, index: number)=>{
                underIds = [...underIds, item["id"]]
            })

            if(underIds.length == 0) underIds = [null];
            queryBuilder.andWhere('admin.id IN (:...ids)', { ids: [token.id, ...underIds]})
        }
    
        if(searchValue) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where("admin.identity LIKE :searchValue")
                    .orWhere("admin.nickname LIKE :searchValue")
                    .orWhere("admin.code LIKE :searchValue")
            }), { searchValue: `%${searchValue}%`});
        }

        if(level) {    
            queryBuilder.andWhere("admin.level LIKE :level", { level })
        } else {
            queryBuilder.andWhere('admin.level > :level', { level: token.level})
        }

        switch (orderBy) {
            case 0:
                queryBuilder.orderBy('admin.createdAt', 'DESC');
                break;
            case 1:
                queryBuilder.orderBy('admin.level', 'ASC');
                ;
        }

        let admins = await queryBuilder.getManyAndCount();
        console.log(admins)
        let [list, total] = Object.values(admins);
        return {list, total};
    }

    async adminIds(token: any): Promise<any> {
        const { id } = token;
        const treeRepository = this.adminRepository;
        const rootNode = await treeRepository.findOne({where: {id}});   
        let adminlist = [];

        const adminIdsStructure = async (node: any, repository: any): Promise<Admin[] | any[]> => {
            const children = await repository.createQueryBuilder("admin")
                .select("admin.id")
                .where("admin.topId = :id", { id: node.id })
                .getMany();

            if (children.length === 0) {
                return;
            }
            adminlist = [...adminlist, ...children];
            await Promise.all(children.map((child: any) => adminIdsStructure(child, treeRepository)));
        };

        await adminIdsStructure(rootNode, treeRepository);
        return adminlist;
    };

    async adminStructure(node: any, repository: any): Promise<Admin[]> {
        const children = await repository.createQueryBuilder("admin")
            .leftJoinAndSelect('admin.topId', "adminTop")
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
        let {id, memo} = body;

        await this.adminRepository.createQueryBuilder("user")
            .update()
            .set({memo})
            .where("user.id = :id", {id})
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

    async getBlockAdmin(body: any): Promise<object> {
        let { limit, offset, searchValue, level, orderBy } = body;

        if(!limit) {
            limit = 0
            offset = 0
        }

        const queryBuilder = this.adminRepository.createQueryBuilder("admin")
            .leftJoinAndSelect('admin.topId', "adminTop")
            .andWhere("admin.blockedAt IS NOT NULL")
            .orderBy('admin.createdAt', 'DESC')
            .skip(offset)
            .take(limit)

        if(searchValue) {
            queryBuilder.andWhere(new Brackets(qb => {
                qb.where("admin.identity LIKE :searchValue")
            }), { searchValue: `%${searchValue}%`});
        }

        if(level) {    
            queryBuilder.andWhere("admin.level LIKE :level", { level })
        }

        switch (orderBy) {
            case 0:
                queryBuilder.orderBy('admin.createdAt', 'DESC');
                break;
            case 1:
                queryBuilder.orderBy('admin.level', 'ASC');
                break;
        }
        let blockAdmins = await queryBuilder.getManyAndCount();
        
        let [list, total] = Object.values(blockAdmins);
        
        return {list, total};
    };

    async setBlockAdmin(body: any): Promise<object> {
        let { id } = body;
        const setBlockAdmin = await this.adminRepository.createQueryBuilder()
            .update()
            .set({blockedAt: null})
            .where("id = :id", { id })
            .execute();

        return setBlockAdmin;
    };

    async deleteBlockAdmin(body: any): Promise<object> {
        let { id } = body;
        const deleteBlockAdmin = await this.adminRepository.createQueryBuilder()
            .update()
            .set({blockedAt: nowDate()})
            .where("id = :id", { id })
            .execute();

        return deleteBlockAdmin;
    };
} 