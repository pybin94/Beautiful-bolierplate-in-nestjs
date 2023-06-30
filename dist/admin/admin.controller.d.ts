import { Admin } from './entity/admin.entity';
import { AdminService } from './admin.service';
import { Request } from 'express';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    admin(body: any, token: any): Promise<object>;
    adminTree(body: any, token: any): Promise<object>;
    checkAdminIdentity(body: any): Promise<object>;
    checkAdminCode(body: any): Promise<object>;
    createAdmin(body: any, token: any, req: Request): Promise<object>;
    admins(body: any, token: any): Promise<object>;
    updateAdmin(body: any, token: any): Promise<object>;
    updateAdminPassword(body: any, token: Admin): Promise<object>;
    deleteAdmin(body: any): Promise<object>;
    adminTop(body: any, token: any): Promise<object>;
    transaction(body: any, token: any): Promise<object>;
    payment(body: any, token: any): Promise<object>;
}
