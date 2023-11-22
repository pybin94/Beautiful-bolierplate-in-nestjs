import { handleError, handleSend } from 'src/config/log.tools.config';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly datasource: DataSource,
    ) {}

    async checkUserIdentity(body: any): Promise<object> {
        try{
            const duplicateCheckIdentity = await this.userRepository.duplicateCheck(body, "identity")
            if (duplicateCheckIdentity.count > 0 ) {
                return handleError("[Service] createUser", [], "다른 아이디를 사용해주세요.");
            }
            return handleSend(duplicateCheckIdentity, "사용 가능한 아이디입니다.")
        } catch (error) {
            return handleError("[Service] checkAdminIdentity", error, "중복확인 오류")
        }
    }

    async createUser(body: any, token: any, req: Request): Promise<object> {
        let queryRunner: QueryRunner;

        try {
            queryRunner = this.datasource.createQueryRunner()
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const duplicateCheckIdentity = await this.userRepository.duplicateCheck(body, "identity")
            if (duplicateCheckIdentity.count > 0 ) {
                return handleError("[Service] createUser", [], "다른 아이디를 사용해주세요.");
            }

            body.topId = token.id
            body.joinIp = req.ip

            const createUser = await this.userRepository.createUser(body, queryRunner);
            body.userId = createUser["id"]

            await queryRunner.commitTransaction()

            return handleSend()
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return handleError("[Service] createUser", error, error)
        } finally {
            await queryRunner.release();
        }
    }

    async users(body: any, token: any): Promise<object> {
        try {
            let users = await this.userRepository.users(body, token)
            const [list, total] = Object.values(users);

            return handleSend({list, total});
        } catch (error) {
            return handleError("[Service] users", error, "데이터 조회중 에러가 발생했습니다.")
        }
    }

    async updateUser(body: any, token: any): Promise<object> {
        try {
            await this.userRepository.updateUser(body);
            return handleSend([], "저장을 완료했습니다."); 

        } catch (error) {
            return handleError("[Service] updateUser", error, error)
        }
    }

    async updateUserPassword(body: any): Promise<object> {
        try {
            const updateUserPassword = await this.userRepository.updateUserPassword(body)
            return handleSend(updateUserPassword, "비밀번호가 변경됐습니다."); 
        } catch (error) {
            return handleError("[Service] updateUserPassword", error)
        }
    }

    async deleteUser(body: any): Promise<object> {
        try{
            const deleteUser =  await this.userRepository.deleteUser(body)
            return handleSend(deleteUser, "플레이어를 삭제했습니다."); 
        } catch (error) {
            return handleError("[Service] deleteUser", error)
        }
    }

}