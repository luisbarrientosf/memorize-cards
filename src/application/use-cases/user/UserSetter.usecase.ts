import { User } from "@/domain/entities/User.entity";
import { UserRepository } from "@/domain/repositories/UserRepository.interface";

export class UserSetter {
  constructor(private userRepository: UserRepository) {}

  async run(name: string): Promise<User> {
    return await this.userRepository.set(name);
  }
}