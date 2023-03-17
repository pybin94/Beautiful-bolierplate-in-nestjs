import { Crypto } from './../helper/crypto.helper';
import { log, handleError } from '../config/log.tools.config';
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
    
    async signIn(authCredentialsDto: AuthCredentialsDto, res: any): Promise<boolean> {
        try {
            const user = await this.authRepository.checkUser(authCredentialsDto);
            const { identity, password } = authCredentialsDto;

            if(user !== null && password === user.password) {
                const payload = { identity };
                const accessToken = this.jwtService.sign(payload);

                const authValue = [{
                    identity: identity
                }]

                const encrypt = this.crypto.encryptObject(authValue)

                await res.cookie("jwt", accessToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    domain: process.env.CLIENT_DOMAIN && "localhost",
                    path: '/',
                })
                await res.cookie("auth", encrypt, {
                    sameSite: "none",
                    secure: true,
                    domain: process.env.CLIENT_DOMAIN && "localhost",
                    path: '/',
                })
                return true
            }  else {
                return false;
            }
        } catch ( error ) {
            log("signIn", error)
        }
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<[]> {
        return await this.authRepository.createUser(authCredentialsDto);
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
            await res.cookie("auth", null,{
                sameSite: "none",
                secure: true,
                domain: process.env.CLIENT_DOMAIN && "localhost",
                path: '/',
                maxAge: 0
            });
        } catch (error) {
            handleError("signOut()", error)
        }
    }
}