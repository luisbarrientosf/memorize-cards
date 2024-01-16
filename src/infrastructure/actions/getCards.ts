import { Card } from "@/domain/entities/Card.entity";
import { CardGetter } from "@/application/use-cases/card/CardGetter.usecase";
import { CardApi } from "../repositories/Card.api";

export const getCards: () => Promise<Card[]> = () => {
  const cardRepo = new CardApi();
  const cardGetter = new CardGetter(cardRepo);
  return cardGetter.run();
}