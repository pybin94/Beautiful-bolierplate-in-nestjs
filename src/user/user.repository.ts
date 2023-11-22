import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Brackets, QueryRunner, Repository } from "typeorm";
import { User } from './entity/user.entity';
import { AdminRepository } from 'src/admin/admin.repository';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly adminRepository: AdminRepository,
    ) {};

    async duplicateCheck(body: any, checkColumn: string): Promise<{ count: number }> {
        let setWhere: object;
        if(checkColumn == "identity" && body[checkColumn]) {
            setWhere = {identity: body[checkColumn]}
        } else if (checkColumn == "code" && body[checkColumn]){
            setWhere = {code: body[checkColumn]}
        } else {
            return {count: 1}
        }
        const duplicateCheck = await this.userRepository.createQueryBuilder()
            .select('COUNT(*)', 'count')
            .andWhere(setWhere)
            .getRawOne();

        return duplicateCheck
    }           

    async createUser(body: any, queryRunner: QueryRunner): Promise<object> {
        const user = this.userRepository.create(body);
        const userSave = await queryRunner.manager.save(user);
        return userSave;
    }

    async users(body: any, token: any): Promise<object> {
            let { limit, offset, searchValue, status } = body;
            let users: User[] | any[];
            let topIds = [];

            const admins = await this.adminRepository.admins({}, token)
            admins[0].forEach((item: object, index: number)=>{
                topIds = [...topIds, item["id"]]
            })

            if(!limit) {
                limit = 0
                offset = 0
            }

            const queryBuilder = this.userRepository.createQueryBuilder("user")
                .leftJoinAndSelect('user.topId', "admin")
                .where('user.top_id IN (:...ids)', { ids: [token.id, ...topIds]})
                .orderBy('user.createdAt', 'DESC')
                .skip(offset)
                .take(limit)
            
            if(status == true) {
                queryBuilder.andWhere('user.status <> 0')
            } else if (!status){
                queryBuilder.andWhere('user.status = 0')
            } else {
                queryBuilder.andWhere('user.status = :status', {status});
            }

            
            if(searchValue) {
                queryBuilder.andWhere(new Brackets(qb => {
                    qb.where("user.identity LIKE :identity", { identity: `%${searchValue}%` })
                        .orWhere("user.nickname LIKE :nickname", { nickname: `%${searchValue}%` })
                        .orWhere("admin.identity LIKE :identity", { identity: `%${searchValue}%` })
                }));
            }

            users = await queryBuilder.getManyAndCount();
            return users;
    }

    async updateUser(body: any): Promise<void> {
        let {id, phoneNumber, memo} = body;

        await this.userRepository.createQueryBuilder("user")
            .update()
            .set({phoneNumber, memo})
            .where("user.id = :id", {id})
            .execute();
    }

    async updateUserPassword(body: any): Promise<object> {

        let {id, password, passwordConfirm} = body;
        
        if (password !== passwordConfirm) {
            throw "비밀번호가 일치하지 않습니다."
        }

        const updateUser = await this.userRepository.createQueryBuilder("user")
            .update()
            .set({password})
            .where("id = :id", {id})
            .execute();

        return updateUser;
    }

    async deleteUser(body: any): Promise<object> {
        let { id } = body;
        const deleteUser = await this.userRepository.createQueryBuilder("user")
        .softDelete()
        // .restore()   // soft deleted된 플레이어 복구
        .where("id = :id", { id })
        .execute()

        return deleteUser;
    }

}