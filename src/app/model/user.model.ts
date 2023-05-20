export class User {

  public email: string;
  public name: string;
  public uid: string;

  static fromFirebase({uid, name, email}: any): User {
    return new User(uid, name, email);
  }

  constructor(uid: string, user: string, email: string){
    this.email = email;
    this.name = user;
    this.uid = uid;
  }

}
