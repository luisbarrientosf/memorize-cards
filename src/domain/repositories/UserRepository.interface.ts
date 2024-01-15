import { User } from "../entities/User.entity";

export interface UserRepository {
  get(): Promise<User>;
  set(name: string): Promise<User>;
}