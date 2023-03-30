import { handleSuccess, handleError } from './../config/log.tools.config';
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
            return handleSuccess(saveAdmin, "관리자를 생성했습니다."); 
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
            let limit = body.limit;
            let offset = body.offset;
            let searchValue = body.searchValue;
            let authSort = body.authSort;
            let admins: any;
            let requirement: object = [{ 
                auth: Not(0)
            }];

            if (searchValue && !authSort) { // 검색만
                requirement = [
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
                requirement = [
                    { 
                        auth: authSort
                    }
                ];
            } else if (searchValue && authSort) { // 둘 다
                requirement = [
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
            
            admins = await this.repository.findAndCount({
                where: requirement,
                take: limit,
                skip: offset,
                order: {
                    created_at: "DESC",
                },
            });

            const [list, total] = admins;
           
            return handleSuccess({list, total});
        } catch (error) {
            return handleError("allIsers", error, "데이터 조회중 에러가 발생했습니다.")
        }
    }
}