import { User } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  async execute(data: UserRequest) {
    const userRepository = UserRepository.getInstance();
    const user = User.create(data);

    if (!data.username || !data.password) {
      throw new Error("Username or password is required");
    }

    const userAlreadyExists = await userRepository.findByUserName(
      data.username
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const userCreated = await userRepository.save(user);
    return userCreated;
  }
}
