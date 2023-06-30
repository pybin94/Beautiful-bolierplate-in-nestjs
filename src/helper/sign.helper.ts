import { Injectable } from '@nestjs/common';

@Injectable()
export class Sign {
  
    async in (res: any, accessToken: string) {
        await res.cookie("adminJwt", accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            domain: process.env.CLIENT_DOMAIN && "localhost",
            path: '/',
        })
    }
    
    async out (res: any) {
        await res.cookie("adminJwt", null, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            domain: process.env.CLIENT_DOMAIN && "localhost",
            path: '/',
            maxAge: 0
        });
        await res.cookie("Info", null,{
            sameSite: "none",
            secure: true,
            domain: process.env.CLIENT_DOMAIN && "localhost",
            path: '/',
            maxAge: 0
        });
    }
}