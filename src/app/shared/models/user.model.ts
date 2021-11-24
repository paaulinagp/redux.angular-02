export class User {

  static fromFirebase({uid, nombre, email }: any) {
    return new User(uid, nombre, email);
  }

  constructor(
    public uid?: string,
    public nombre?: string,
    public email?: string | null
  ) {}


}