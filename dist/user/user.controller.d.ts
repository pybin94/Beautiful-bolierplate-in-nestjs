import { UserService } from './user.service';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    checkAdminIdentity(body: any): Promise<object>;
    createUser(body: any, token: any, req: Request): Promise<object>;
    users(body: any, token: any): Promise<object>;
    updateUser(body: any, token: any): Promise<object>;
    updateUserPassword(body: any): Promise<object>;
    deleteUser(body: any): Promise<object>;
    transaction(body: any, token: any): Promise<object>;
    payment(body: any, token: any): Promise<object>;
}
