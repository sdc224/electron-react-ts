import { Gitlab } from 'gitlab';
import credentials from '@private/credentials';
import GitlabOperations from '..';
import { IAuth } from '../../authentication';
import GitlabAuth from '../../authentication/gitlabAuth';
import GitlabEnterpriseAuth from '../../authentication/gitlabEntAuth';

export default class GitlabEnterprise extends GitlabOperations {
  private auth: IAuth;

  constructor() {
    // TODO : Validate URL using regex
    super(new Gitlab(credentials));
    // Decorator Pattern
    this.auth = new GitlabAuth(new GitlabEnterpriseAuth(credentials));
  }

  public async init(): Promise<void> {
    await this.auth.authenticate();
  }
}
