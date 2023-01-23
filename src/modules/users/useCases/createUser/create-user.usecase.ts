import { parameterRequiredError } from "../../../../errors/parameter-required.error";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UserRequest) {
    const user = User.create(data);

    if (!data.username || !data.password) {
      throw new parameterRequiredError("Username or password is required", 422);
    }

    const userAlreadyExists = await this.userRepository.findByUserName(
      data.username
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }
}
