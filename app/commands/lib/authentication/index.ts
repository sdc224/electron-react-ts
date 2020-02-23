export interface IAuth {
  authenticate(): Promise<void>;
}

export abstract class Auth implements IAuth {
  protected auth: IAuth;

  constructor(auth: IAuth) {
    this.auth = auth;
  }

  authenticate = async (): Promise<void> => {
    await this.auth.authenticate();
  };
}
