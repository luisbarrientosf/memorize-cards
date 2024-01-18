import { User } from "@/domain/entities/User.entity";
import { UserSetter } from "@/application/use-cases/UserSetter.usecase";
import { UserLocalStorage } from "../repositories/User.localStorage"

export const setUser: (name: string) => Promise<User> = (name) => {
  const userRepo = new UserLocalStorage();
  const userSetter = new UserSetter(userRepo);
  return userSetter.run(name);
}