import { AppDataSource } from "src/data-source";
import { User } from "src/entities/user.rntity";

export class UserRepository {
    userRepository = AppDataSource.getRepository(User);
}