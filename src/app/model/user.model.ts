export class User {
  uid: string
  name: string;
  email: string;
  password: string;

  constructor(uid: string, user: string, email: string, password:string){
    this.uid = uid;
    this.name = user;
    this.email = email;
    this.password = password
  }
}

/*export interface User {
  user: string;
  email: string;
  password: string;
}*/
