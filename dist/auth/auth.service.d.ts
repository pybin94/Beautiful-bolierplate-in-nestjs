import { AuthRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { Sign } from 'src/helper/sign.helper';
import { Request } from 'express';
export declare class AuthService {
    private readonly authRepository;
    private jwtService;
    private sign;
    constructor(authRepository: AuthRepository, jwtService: JwtService, sign: Sign);
    signIn(authCredentialsDto: AuthCredentialsDto, res: any, req: Request): Promise<object | boolean>;
    signOut(res: any): Promise<object>;
}
