export class User {
  constructor(
    public readonly uid: string,
    public readonly email: string | null,
    public readonly displayName: string | null,
    public readonly emailVerified: boolean,
  ) {}

  static create(
    uid: string,
    email: string | null,
    displayName: string | null,
    emailVerified: boolean,
  ): User {
    return new User(uid, email, displayName, emailVerified);
  }

  hasEmail(): boolean {
    return this.email !== null && this.email.length > 0;
  }

  isVerified(): boolean {
    return this.emailVerified;
  }
}
