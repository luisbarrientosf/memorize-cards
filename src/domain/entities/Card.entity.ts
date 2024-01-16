export class Card {
  id: string;
  uuid: string;
  url: string;
  matched: boolean;

  constructor(
    id: string,
    uuid: string,
    url: string,
    matched: boolean
  ) {
    this.id = id;
    this.uuid = uuid;
    this.url = url;
    this.matched = matched;
  }
}