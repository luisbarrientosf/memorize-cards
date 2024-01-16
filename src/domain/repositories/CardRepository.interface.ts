import { Card } from "../entities/Card.entity";

export interface CardRepository {
  get(): Promise<Card[]>;
}