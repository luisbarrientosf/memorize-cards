import { Card } from "@/domain/entities/Card.entity";
import { CardRepository } from "@/domain/repositories/CardRepository.interface";

export class CardGetter {
  constructor(private cardRepository: CardRepository) {}

  async run(): Promise<Card[]> {
    return await this.cardRepository.get();
  }
}