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
    Card.checkForInvalidValues(id, uuid, url);
    this.id = id;
    this.uuid = uuid;
    this.url = url;
    this.matched = matched;
  }

  static checkForInvalidValues(id: string, uuid: string, url: string){
    if(id.length === 0) throw new Error("id can't be empty");
    if(uuid.length === 0) throw new Error("uuid can't be empty");
    if(url.length === 0) throw new Error("url can't be empty");
  }
}