export class UserNotFound extends Error {
  constructor() {
    super("USER_NOT_FOUND");
  }
}