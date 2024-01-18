import { Card } from "@/domain/entities/Card.entity";

describe('Card', () => {
  it('create Card correctly', () => {
    const card = new Card("id", "uuid", "url", false);
    expect(card.id).toBe("id");
    expect(card.uuid).toBe("uuid");
    expect(card.url).toBe("url");
    expect(card.matched).toBe(false);
  });

  it('throws error when id empty', () => {
    try {
      new Card("", "uuid", "url", false);
    } catch (e) {
      expect(e).toStrictEqual(Error("id can't be empty"));
    }
  });

  it('throws error when uuid empty', () => {
    try {
      new Card("id", "", "url", false);
    } catch (e) {
      expect(e).toStrictEqual(Error("uuid can't be empty"));
    }
  });

  it('throws error when url empty', () => {
    try {
      new Card("id", "uuid", "", false);
    } catch (e) {
      expect(e).toStrictEqual(Error("url can't be empty"));
    }
  });
});