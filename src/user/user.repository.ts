import { handleError, handleSuccess } from './../config/log.tools.config';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { Like, Repository } from "typeorm";
import { User } from './user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {};

    async createUser(userSignInDto: UserSignInDto): Promise<object> {

        const user = this.repository.create(userSignInDto);
        try {
            const saveUser = await this.repository.save(user);
            return handleSuccess(saveUser, "관리자를 생성했습니다.");
        } catch (error) {
             if(error.errno === 1062) {
                return handleError("[Repository] createAdmin", error, "유저 아이디가 존재합니다.")
            } else {
                return handleError("[Repository] createAdmin", error)
            }
        }
    }

    async users(body: any): Promise<object> {
        try {
            let limit = body.limit;
            let offset = body.offset;
            let searchValue = body.searchValue;
            let where: object = []

            if(searchValue) {
                where = [
                    { identity: Like(`%${searchValue}%`) },
                    { user_name: Like(`%${searchValue}%`) }
                ];
            };

            let users = await this.repository.createQueryBuilder("user")
            .select()
            .where(where)
            .orderBy('user.created_at', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();

            const [list, total] = users;
           
            return handleSuccess({list, total});
        } catch (error) {
            return handleError("createUser", error, "데이터 조회중 에러가 발생했습니다.")
        }
    }
}