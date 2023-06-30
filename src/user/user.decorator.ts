import { Admin } from '../admin/entity/admin.entity';
import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const Token = createParamDecorator((data, ctx: ExecutionContext): Admin | object=> {
    const req = ctx.switchToHttp().getRequest();
    const token = req.token;

    if(data == undefined || data >= token.level) {
        return token;
    }
    throw new UnauthorizedException('Unauthorized', '-2');
})