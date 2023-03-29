import { handleSuccess, handleError } from './../config/log.tools.config';
import { AdminSignInDto } from './dto/admin-sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, UnauthorizedException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { Like, Repository } from "typeorm";
import { Admin } from './admin.entity';

@Injectable()
export class AdminRepository {
    constructor(
        @InjectRepository(Admin)
        private readonly repository: Repository<Admin>,
    ) {};
    
    async createAdmin(adminSignInDto: AdminSignInDto): Promise<[]> {

        const admin = this.repository.create(adminSignInDto);
        try {
            const saveAdmin = await this.repository.save(admin);
            console.log(saveAdmin);
            return 
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async admins(body: any): Promise<object> {
        try {
            let limit = body.limit;
            let offset = body.offset;
            let findData = body.findData;
            let admins: any;

            if(findData) {
                admins = await this.repository.findAndCount({
                    where: [
                      { identity: Like(`%${findData}%`) },
                      { user_name: Like(`%${findData}%`) }
                    ],
                    take: limit,
                    skip: offset,
                });
            } else {
                admins = await this.repository.findAndCount({
                    take: limit,
                    skip: offset,
                });
            }

            const [list, total] = admins;
           
            return handleSuccess({list, total});
        } catch (error) {
            handleError("allIsers", error, "데이터 조회중 에러가 발생했습니다.")
        }
    }
}