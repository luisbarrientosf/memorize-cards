import { User } from "@/domain/entities/User.entity";
import { UserRepository } from "@/domain/repositories/UserRepository.interface";

export class UserGetter {
  constructor(private userRepository: UserRepository) {}

  async run(): Promise<User> {
    return await this.userRepository.get();
  }
}