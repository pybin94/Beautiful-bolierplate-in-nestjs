import { Crypto } from './../helper/crypto.helper';
import { handleError } from '../config/log.tools.config';
import { AuthRepository } from './auth.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private jwtService: JwtService,
        private crypto: Crypto
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
                
                await res.cookie("jwt", accessToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    domain: process.env.CLIENT_DOMAIN && "localhost",
                    path: '/',
                })
                return authValue;
            }  else {
                return false;
            }
        } catch ( error ) {
            return handleError("signIn", error)
        }
    }

    async signOut(res: any) {
        try {
            await res.cookie("jwt", null, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                domain: process.env.CLIENT_DOMAIN && "localhost",
                path: '/',
                maxAge: 0
            });
            await res.cookie("user", null,{
                sameSite: "none",
                secure: true,
                domain: process.env.CLIENT_DOMAIN && "localhost",
                path: '/',
                maxAge: 0
            });
        } catch (error) {
            return handleError("signOut()", error)
        }
    }
}