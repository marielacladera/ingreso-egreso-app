export class User {
  uid: string
  name: string;
  email: string;

  static fromFirebase({uid, name, email}: any): User {
    return new User(uid, name, email);
  }

  constructor(uid: string, user: string, email: string){
    this.uid = uid;
    this.name = user;
    this.email = email;
  }

}
