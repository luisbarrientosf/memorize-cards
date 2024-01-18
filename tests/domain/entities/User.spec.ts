import { User } from "@/domain/entities/User.entity";

describe('User', () => {
  it('create User correctly', () => {
    const user = new User("name");
    expect(user.name).toBe("name");
  });

  it('throws error when name empty', () => {
    try {
      new User("");
    } catch (e) {
      expect(e).toStrictEqual(Error("name can't be empty"));
    }
  });
});