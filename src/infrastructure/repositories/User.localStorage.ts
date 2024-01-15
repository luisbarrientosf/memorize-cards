import { User } from "@/domain/entities/User.entity";
import { UserNotFound } from "@/domain/exceptions/UserNotFound";
import { UserRepository } from "@/domain/repositories/UserRepository.interface";

export class UserLocalStorage implements UserRepository {
  async set(name: string): Promise<User> {
    localStorage.setItem("userId", name);
    return new User(name)
  }

  async get(): Promise<User> {
    const name = localStorage.getItem("userId");

    if (!name) {
      throw new UserNotFound();
    }

    return new User(name)
  }
}