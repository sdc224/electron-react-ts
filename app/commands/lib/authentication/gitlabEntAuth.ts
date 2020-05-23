import { IAuth } from '.';
import { authenticate } from './lib';

export default class GitlabEnterpriseAuth implements IAuth {
  constructor(private readonly credentials: IGitlabCredentials) {}

  public authenticate = (): Promise<void> => authenticate(this.credentials);
}
