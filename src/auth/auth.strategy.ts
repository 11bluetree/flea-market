import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@sentry/node";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiretion: false, // 有効期限を無視するか
            secretOrKey: 'secretkey123',
        })
    }
    async validate/* このメソッド名は変えないように */(payload: { id: string, username: string }): Promise<User> {
        const { id, username } = payload;
        const user = await this.userRepository.userRepository.findOne({
            where: {
                id,
                username,
            }
        })

        if (user) {
            return user;
        }
        throw new UnauthorizedException();
    }
}