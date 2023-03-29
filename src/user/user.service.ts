import { User } from './user.entity';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async createUser(userSignInDto: UserSignInDto): Promise<[]> {
        return await this.userRepository.createUser(userSignInDto);
    }

    async users(body: any): Promise<object> {
        return await this.userRepository.users(body)
    }
}
