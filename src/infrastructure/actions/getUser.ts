import { UserGetter } from "@/application/use-cases/UserGetter.usecase";
import { UserLocalStorage } from "../repositories/User.localStorage"
import { User } from "@/domain/entities/User.entity";

export const getUser: () => Promise<User> = () => {
  const userRepo = new UserLocalStorage();
  const userGetter = new UserGetter(userRepo);
  return userGetter.run();
}