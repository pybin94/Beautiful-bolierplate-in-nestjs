import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Admin } from "../admin/admin.entity";
import {config} from 'dotenv';

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Admin)
        private readonly repository: Repository<Admin>,
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET_KEY,
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: any) {
        const admin = await this.repository.findOne(payload);
        if(!admin) {
            throw new UnauthorizedException();
        }
        return admin;
    }
}