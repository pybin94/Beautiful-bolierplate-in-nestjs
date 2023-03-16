import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { ConflictException, UnauthorizedException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from "typeorm";
import { User } from '../user/user.entity';

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {};

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<[]> {
        const { identity, password } = authCredentialsDto;
        const user = this.repository.create({ identity, password });
        try {
            await this.repository.save(user);
            return 
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async checkUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { identity, password } = authCredentialsDto;
        return await this.repository.findOne({ where: { identity } });
    }
}