import { handleError, handleSend } from './../config/log.tools.config';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
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
            return handleSend(saveUser, "유저를 생성했습니다.");
        } catch (error) {
             if(error.errno === 1062) {
                return handleError("[Repository] createUser", error, "유저 아이디가 존재합니다.")
            } else {
                return handleError("[Repository] createUser", error)
            }
        }
    }

    async users(body: any): Promise<object> {
        let { limit, offset, searchValue } = body;
        try {
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
            // .withDeleted()   // soft deleted된 유저 표시
            .skip(offset)
            .take(limit)
            .getManyAndCount();

            const [list, total] = users;
           
            return handleSend({list, total});
        } catch (error) {
            return handleError("[Repository] users", error, "데이터 조회중 에러가 발생했습니다.")
        }
    }

    async updateUser(body: any): Promise<object> {
        let {id, set1, set2, set3, memo} = body;
        try {
            const updateUser = await this.repository.createQueryBuilder("user")
                .update()
                .set({set1, set2, set3, memo})
                .where("id = :id", {id})
                .execute();

            return handleSend(updateUser, "저장을 완료했습니다."); 
        } catch (error) {
            return handleError("[Repository] updateUser", error)
        }
    }

    async updateUserPassword(body: any): Promise<object> {

        let {id, password, passwordConfirm} = body;
        
        if (password !== passwordConfirm) {
            return handleSend([], "비밀번호가 일치하지 않습니다.", 0 )
        }

        try {
            const updateAdmin = await this.repository.createQueryBuilder("user")
                .update()
                .set({password})
                .where("id = :id", {id})
                .execute();

            return handleSend(updateAdmin, "비밀번호가 변경되었습니다."); 
        } catch (error) {
            return handleError("[Repository] updateUserPassword", error)
        }
    }

    async deleteUser(body: any): Promise<object> {
        let { id } = body;
        try {
            const deleteUser = await this.repository.createQueryBuilder("user")
            .softDelete()
            // .restore()   // soft deleted된 유저 복구
            .where("id = :id", { id })
            .execute()

            return handleSend(deleteUser, "유저를 삭제했습니다."); 
        } catch (error) {
            return handleError("[Repository] deleteUser", error)
        }
    }
}