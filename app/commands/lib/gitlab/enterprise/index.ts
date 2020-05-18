import { Gitlab } from '@gitbeaker/browser';
import credentials from '@private/credentials';
import GitlabOperations from '..';
import { IAuth } from '../../authentication';
import GitlabAuth from '../../authentication/gitlabAuth';
import GitlabEnterpriseAuth from '../../authentication/gitlabEntAuth';

export default class GitlabEnterprise extends GitlabOperations {
  private auth: IAuth;

  constructor(providedCreds: IGitlabCredentials = credentials) {
    // TODO : Validate URL using regex
    super(new Gitlab(providedCreds));
    // Decorator Pattern
    this.auth = new GitlabAuth(new GitlabEnterpriseAuth(providedCreds));
  }

  public init = async (): Promise<void> => {
    await this.auth.authenticate();
  };
}
