import { AppDataSource } from "src/data-source";
import { User } from "src/entities/user.rntity";
import { CreateUserDto } from "./dto/create-user.dto";



export class UserRepository {
    readonly userRepository = AppDataSource.getRepository(User);

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, password, status } = createUserDto;
        const user = this.userRepository.create({ username, password, status })

        await this.userRepository.save(user);
        return user;
    }
}