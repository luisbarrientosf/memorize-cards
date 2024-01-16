import { Card } from "@/domain/entities/Card.entity";
import { ModyoContentResponse } from "../dto/ModyoContentResponse.dto";

export class CardMapper {
  static fromModyoContentResponse(dto: ModyoContentResponse) : Card[] {
    return dto.entries.map(entry => {
      return new Card(
        entry.fields.image.uuid,
        entry.fields.image.uuid,
        entry.fields.image.url,
        false
      )
    });
  }
}