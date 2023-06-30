import { Repository } from 'typeorm';
import { Admin } from "../admin/entity/admin.entity";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly repository;
    constructor(repository: Repository<Admin>);
    validate(payload: any): Promise<Admin>;
}
export {};
