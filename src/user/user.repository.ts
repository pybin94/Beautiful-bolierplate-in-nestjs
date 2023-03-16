import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, UnauthorizedException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from "typeorm";
import { User } from './user.entity';

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {};

}