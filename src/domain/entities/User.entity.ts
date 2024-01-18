export class User {
  public name: string;

  constructor (
    name: string
  ) {
    User.checkForInvalidValues(name);
    this.name = name;
  }

  static checkForInvalidValues(name: string){
    if(name.length === 0) throw new Error("name can't be empty");
  }
}