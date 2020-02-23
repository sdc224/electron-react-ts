import { Auth } from '.';

export default class GitlabAuth extends Auth {
  // super auth for base class

  public authenticate = async () => {
    await this.auth.authenticate();
  };
}
