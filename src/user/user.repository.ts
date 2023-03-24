import { UserSignInDto } from './dto/user-sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, UnauthorizedException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from "typeorm";
import { User } from './user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {};

    async createUser(userSignInDto: UserSignInDto): Promise<[]> {
        console.log(userSignInDto,"opkjlsafxhc")
        const user = this.repository.create(userSignInDto);
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
}