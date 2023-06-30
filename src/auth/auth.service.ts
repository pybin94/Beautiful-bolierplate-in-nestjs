import { handleError } from '../config/log.tools.config';
import { AuthRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { Sign } from 'src/helper/sign.helper';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private jwtService: JwtService,
        private sign: Sign,
    ) {}

    async signIn(authCredentialsDto: AuthCredentialsDto, res: any, req: Request): Promise<object | boolean> {

        const { identity, password } = authCredentialsDto;
        if(!identity || !password) {
            return false;
        }
        try {
            const admin = await this.authRepository.checkAdmin(authCredentialsDto, req);
            if(password === admin.password) {
                const payload = { id: admin.id, identity, nickname: admin.nickname, level: admin.level };
                const accessToken = this.jwtService.sign(payload);
                
                const authValue = {
                    identity: admin.identity,
                    nickname: admin.nickname,
                }
                await this.sign.in(res, accessToken)
                return authValue;
            }  else {
                return false;
            }
        } catch ( error ) {
            handleError("[Service] signIn", error)
            return false;
        }
    }

    async signOut(res: any) {
        try {
            await this.sign.out(res)
        } catch (error) {
            return handleError("[Service] signOut", error)
        }
    }
}