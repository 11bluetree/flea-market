import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@sentry/node';
import { async } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credemtials.dto';
import { UserRepository } from './user.repository';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtservice: JwtService,) { }


    async signUp(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(createUserDto);
    }

    async signIn(credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
        const { username, password, } = credentialsDto;
        const user = await this.userRepository.userRepository.findOne({
            where: {
                username
            }
        });

        // DBのパスワードと与えられたパスワードのハッシュが同じかチェック
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = {
                id: user.id, username: user.username,
            }
            const accessToken = this.jwtservice.sign(payload);
            return { accessToken }
        }
        throw new UnauthorizedException('ユーザ名またはパスワードを確認してください');
    }

}
