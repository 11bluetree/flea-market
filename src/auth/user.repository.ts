import { AppDataSource } from "src/data-source";
import { User } from "src/entities/user.rntity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';



export class UserRepository {
    readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, password, status } = createUserDto;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,salt);

        const user = this.userRepository.create({ username, password: hashPassword, status })

        await this.userRepository.save(user);
        return user;
    }
}