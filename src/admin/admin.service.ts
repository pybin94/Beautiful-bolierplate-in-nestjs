import { Admin } from './entity/admin.entity';
import { AdminRepository } from './admin.repository';
import { Injectable } from '@nestjs/common';
import { handleError, handleSend } from 'src/config/log.tools.config';
import { DataSource, QueryRunner } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class AdminService {
    constructor(
        private readonly adminRepository: AdminRepository,
        private readonly datasource: DataSource,
    ) {}

    async admin(body: any, token: any): Promise<object> {
        try{
            const admin = await this.adminRepository.admin(body, token);
            return handleSend(admin)
        } catch (error) {
            return handleError("[Service] admin", error)
        }
    }

    async adminTree(body: any, token: any): Promise<object> {
        try{
            const adminTree = await this.adminRepository.adminTree(body, token);
            return handleSend(adminTree)
        } catch (error) {
            return handleError("[Service] adminTree", error)
        }
    }

    async getBlockAdmin(body: any): Promise<object> {
        try {
            const getBlockAdmin = await this.adminRepository.getBlockAdmin(body);
            return handleSend(getBlockAdmin);
        } catch (error) {
            return handleError("[Repository] getBlockAdmin", error, error)
        }
    }

    async setBlockAdmin(body: any): Promise<object> {
        try {
            const setBlockAdmin = await this.adminRepository.setBlockAdmin(body);
            return handleSend(setBlockAdmin, "블락을 해제했습니다."); 
        } catch (error) {
            return handleError("[Repository] setBlockAdmin", error, error)
        }
    }

    async deleteBlockAdmin(body: any): Promise<object> {
        try {
            const deleteBlockAdmin = await this.adminRepository.deleteBlockAdmin(body);
            return handleSend(deleteBlockAdmin, "에이전트를 블락했습니다."); 
        } catch (error) {
            return handleError("[Repository] deleteBlockAdmin", error, error)
        }
    }

    async checkAdminIdentity(body: any): Promise<object> {
        try{
            const duplicateCheck = await this.adminRepository.duplicateCheck(body, "identity");
            if (duplicateCheck.count > 0) {
                return handleError("[Service] checkAdminIdentity", [], "다른 아이디를 사용해주세요.");
            }
            return handleSend(duplicateCheck, "사용 가능한 아이디입니다.")
        } catch (error) {
            return handleError("[Service] checkAdminIdentity", error, "중복확인 오류")
        }
    }

    async checkAdminCode(body: any): Promise<object> {
        try{
            const duplicateCheck = await this.adminRepository.duplicateCheck(body, "code");
            if (duplicateCheck.count > 0) {
                return handleError("[Service] checkAdminCode", [], "다른 가입코드를 사용해주세요.");
            }
            return handleSend(duplicateCheck, "사용 가능한 가입코드입니다.")
        } catch (error) {
            return handleError("[Service] checkAdminCode", error, "중복확인 오류")
        }
    }

    async createAdmin(body: any, token: any, req: Request): Promise<object> {
        let queryRunner: QueryRunner;
        try {
            queryRunner = this.datasource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            
            const duplicateCheckIdentity = await this.adminRepository.duplicateCheck(body, "identity");
            if (duplicateCheckIdentity.count > 0 ) {
                return handleError("[Service] createAdmin", [], "에이전트 아이디가 존재합니다.");
            };

            body.topId = token.id;
            body.level = token.level+1;
            body.joinIp = req.ip
            const createAdmin = await this.adminRepository.createAdmin(body, queryRunner);
            body.adminId = createAdmin["id"];

            await queryRunner.commitTransaction();
            
            return handleSend();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return handleError("[Service] createAdmin", error, error);
        } finally {
            await queryRunner.release();
        }
    }

    async admins(body: any, token: any): Promise<object> {
        try {
            let admins = await this.adminRepository.admins(body, token);
            const [list, total] = Object.values(admins);
            return handleSend({list, total})
        } catch (error) {
            return handleError("[Service] admins", error)
        }
    }

    async updateAdmin(body: any, token: any): Promise<object> {
        try {
            await this.adminRepository.updateAdmin(body)
            return handleSend([], "저장을 완료했습니다."); 
        } catch (error) {
            return handleError("[Service] updateUser", error,  error)
        }
    }

    async updateAdminPassword(body: any, token: Admin): Promise<object> {
        const updateAdminPassword =  await this.adminRepository.updateAdminPassword(body, token);
        return handleSend(updateAdminPassword, "비밀번호가 변경됐습니다."); 
    }

    async adminTop(body: any, token: any): Promise<object> {
        try {
            const daminTop = await this.adminRepository.adminTop(body);
            return handleSend(daminTop, "데이터를 성공적으로 가져왔습니다."); 
        } catch (error) {
            return handleError("[Repository] adminTop", error)
        }
    }
}
