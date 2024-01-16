import { Card } from "@/domain/entities/Card.entity";
import { CardRepository } from "@/domain/repositories/CardRepository.interface";
import { ModyoContentResponse } from "../dto/ModyoContentResponse.dto";
import { CardMapper } from "../mappers/CardMapper";

export class CardApi implements CardRepository {
  async get(): Promise<Card[]> {
    const images: ModyoContentResponse = await fetch("https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20")
      .then(response => response.json())
      .catch(err => console.log(err));
    const cards = CardMapper.fromModyoContentResponse(images);
    const duplicated = [...cards];
    cards.forEach(card => duplicated.push({...card, id: `${card.id}_2`}))
    return duplicated;
  }
}