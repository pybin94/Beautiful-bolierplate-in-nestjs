import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
config();

@Injectable()
export class Sign {
  
    async in (res: any, accessToken: string) {
        await res.cookie("jwt", accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            domain: process.env.CLIENT_DOMAIN && "localhost",
            path: '/',
        })
    }
    
    async out (res: any) {
        await res.cookie("jwt", null, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            domain: process.env.CLIENT_DOMAIN && "localhost",
            path: '/',
            maxAge: 0
        });
        await res.cookie("user", null,{
            sameSite: "none",
            secure: true,
            domain: process.env.CLIENT_DOMAIN && "localhost",
            path: '/',
            maxAge: 0
        });
    }
}