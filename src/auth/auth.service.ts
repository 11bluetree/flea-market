import { Injectable } from '@nestjs/common';
import { User } from '@sentry/node';
import { CreateItemDto } from 'src/items/dto/create-item.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository){}


    async signUp(createUserDto: CreateUserDto): Promise<User>{
        return await this.userRepository.createUser(createUserDto);
    }
}
