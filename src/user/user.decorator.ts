import { Admin } from './../admin/admin.entity';
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Token = createParamDecorator((data, ctx: ExecutionContext): Admin => {
    const req = ctx.switchToHttp().getRequest();
    return req.token;
})