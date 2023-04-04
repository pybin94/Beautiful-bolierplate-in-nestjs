// import { handleError } from './../config/log.tools.config';
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// @Injectable()
// export class AdminAuthGuard implements CanActivate {
//   constructor(
//   ) {}

//   async canActivate(ctx: ExecutionContext): Promise<boolean> {
//     const request = ctx.switchToHttp().getRequest();
//     console.log(request.token)

//     try {
//         return true;
      
//     } catch (error) {
//       handleError("canActivate", error)
//       return false;
//     }
//   }
// }