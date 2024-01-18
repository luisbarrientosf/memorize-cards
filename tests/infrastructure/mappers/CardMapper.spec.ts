import { CardMapper } from "@/infrastructure/mappers/CardMapper";
import { ModyoContentResponseMother } from "../../__mocks__/ModyoContentResponse.mock";

describe('CardMapper', () => {
  it('maps correctly', () => {
    const mock = ModyoContentResponseMother.default();
    const cards = CardMapper.fromModyoContentResponse(mock);

    expect(cards.length).toBe(mock.entries.length);
    mock.entries.forEach((entry, index) => {
      expect(cards[index].uuid).toBe(entry.fields.image.uuid);
      expect(cards[index].url).toBe(entry.fields.image.url);
    });
  });
});