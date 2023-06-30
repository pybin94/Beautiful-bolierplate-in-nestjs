"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const common_1 = require("@nestjs/common");
exports.Token = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const token = req.token;
    if (data == undefined || data >= token.level) {
        return token;
    }
    throw new common_1.UnauthorizedException('Unauthorized', '-2');
});
//# sourceMappingURL=user.decorator.js.map