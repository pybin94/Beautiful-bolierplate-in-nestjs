import { handleError } from '../config/log.tools.config';
import { AuthRepository } from './auth.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { Sign } from 'src/helper/sing.helper';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private jwtService: JwtService,
        private sign: Sign,
    ) {}
    
   
    async signIn(authCredentialsDto: AuthCredentialsDto, res: any): Promise<object | boolean> {

        const { identity, password } = authCredentialsDto;
        if(!identity || !password) {
            return false;
        }
        try {
            const admin = await this.authRepository.checkAdmin(authCredentialsDto);
            if(password === admin.password) {
                const payload = { id: admin.id, identity, auth: admin.auth };
                const accessToken = this.jwtService.sign(payload);
                
                const authValue = {
                    identity: admin.identity,
                    name: admin.user_name,
                    auth: admin.auth,
                }
                await this.sign.in(res, accessToken)
                return authValue;
            }  else {
                return false;
            }
        } catch ( error ) {
            return handleError("signInAdmin", error)
        }
    }

    async signOut(res: any) {
        try {
            await this.sign.out(res)
        } catch (error) {
            return handleError("signOut", error)
        }
    }
}