import { Site } from 'src/site/entity/site.entity';
import { Admin } from "src/admin/entity/admin.entity";
export declare class LogAdminRolling {
    id: number;
    siteId: Site;
    adminId: Admin;
    point: number;
    previousPoint: number;
    postPoint: number;
    gameId: number;
    createdAt: Date;
}
