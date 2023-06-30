import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(authCredentialsDto: AuthCredentialsDto, res: Response, req: Request): Promise<object>;
    signOut(res: any): Promise<object>;
}
