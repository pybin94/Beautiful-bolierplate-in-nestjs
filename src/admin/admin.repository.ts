import { handleSend, handleError } from './../config/log.tools.config';
import { AdminSignInDto } from './dto/admin-sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Like, Not, Repository } from "typeorm";
import { Admin } from './admin.entity';

@Injectable()
export class AdminRepository {
    constructor(
        @InjectRepository(Admin)
        private readonly repository: Repository<Admin>,
    ) {};
    
    async createAdmin(adminSignInDto: AdminSignInDto): Promise<object> {

        const admin = this.repository.create(adminSignInDto);
        try {
            const saveAdmin = await this.repository.save(admin);
            return handleSend(saveAdmin, "관리자를 생성했습니다."); 
        } catch (error) {
            if(error.errno === 1062) {
                return handleError("[Repository] createAdmin", error, "관리자 아이디가 존재합니다.")
            } else {
                return handleError("[Repository] createAdmin", error)
            }
        }
    }

    async admins(body: any): Promise<object> {
        try {
            let { limit, offset, searchValue, authSort } = body;

            let where: object = [{ 
                auth: Not(0)
            }];

            if (searchValue && !authSort) { // 검색만
                where = [
                    { 
                        identity: Like(`%${searchValue}%`),
                        auth: Not(0)
                    },
                    { 
                        user_name: Like(`%${searchValue}%`),
                        auth: Not(0)
                    },
                ];
            } else if (!searchValue && authSort) { // 관리자 등급만
                where = [
                    { 
                        auth: authSort
                    }
                ];
            } else if (searchValue && authSort) { // 둘 다
                where = [
                    { 
                        identity: Like(`%${searchValue}%`),
                        auth: authSort
                    },
                    { 
                        user_name: Like(`%${searchValue}%`),
                        auth: authSort
                    },
                ]
            }
            
            const admins = await this.repository.createQueryBuilder("admin")
                .select()
                .where(where)
                .orderBy('admin.created_at', 'DESC')
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            const [list, total] = admins;
           
            return handleSend({list, total});
        } catch (error) {
            return handleError("[Repository] admins", error, "데이터 조회중 에러가 발생했습니다.")
        }
    }

    async updateAdmin(body: any): Promise<object> {

        let {id, set1, set2, memo} = body;
        try {
            const updateAdmin = await this.repository.createQueryBuilder("user")
                .update()
                .set({set1, set2, memo})
                .where("id = :id", {id})
                .execute();

            return handleSend(updateAdmin, "저장을 완료했습니다."); 
        } catch (error) {
            return handleError("[Repository] updateAdmin", error)
        }
    }

    async updateAdminPassword(body: any, token: Admin): Promise<object> {

        let {id, password, passwordConfirm} = body;
        if (password !== passwordConfirm) {
            return handleSend([], "비밀번호가 일치하지 않습니다.", 0 )
        }

        console.log(id,token, "@@@@@@@@@@@@@@@@@@@@@@@@@")
        if (!id) {
            if (!token.id) {
                return handleSend([], "", -1 )
            }
            id = token.id
        }
        console.log(id, "@@@@@@@@@@@@@@@@@@@@@@@@@")

        try {
            const updateAdmin = await this.repository.createQueryBuilder("user")
                .update()
                .set({password})
                .where("id = :id", {id})
                .execute();

            return handleSend(updateAdmin, "비밀번호가 변경되었습니다."); 
        } catch (error) {
            return handleError("[Repository] updateAdminPassword", error)
        }
    }

    async deleteAdmin(body: any): Promise<object> {
        let { id } = body;
        try {
            const deleteUser = await this.repository.createQueryBuilder("user")
            .softDelete()
            .where("id = :id", { id })
            .execute()

            return handleSend(deleteUser, "관리자를 삭제했습니다."); 
        } catch (error) {
            return handleError("[Repository] deleteAdmin", error)
        }
    }
}