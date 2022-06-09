export class AuthModule {
  static savePassword: (password: string) => {
    // hash or salt password and sign it
    // save user entity
    // return auth signed token
  }
  static validateAuth: (auth: string) => {
    // validate the auth token
    // extract user info
    // return validation
  }
}
