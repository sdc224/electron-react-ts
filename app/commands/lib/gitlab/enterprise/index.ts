import credentials from '@private/credentials';
import GitlabOperations from '..';
import { IAuth } from '../../authentication';
import GitlabAuth from '../../authentication/gitlabAuth';
import GitlabEnterpriseAuth from '../../authentication/gitlabEntAuth';

export default class GitlabEnterprise extends GitlabOperations {
  private auth: IAuth | undefined;

  // Need super call here
  constructor(private organization: string) {
    // TODO : Validate URL using regex
    super();
    // super(new Gitlab(providedCreds));
    // Decorator Pattern
    // this.auth = new GitlabAuth(new GitlabEnterpriseAuth(providedCreds));
  }

  public init = async (
    customCredentials?: IGitlabCredentials | Promise<IGitlabCredentials>
  ): Promise<void> => {
    let providedCredentials:
      | IGitlabCredentials
      | Promise<IGitlabCredentials>
      | undefined = customCredentials;
    if (!providedCredentials)
      providedCredentials = await credentials(this.organization);
    else providedCredentials = await providedCredentials;

    if (!providedCredentials) throw new Error('First Time User');

    this.setGitlab(providedCredentials);

    //  Decorator Pattern
    this.auth = new GitlabAuth(new GitlabEnterpriseAuth(providedCredentials));
    await this.auth!.authenticate();
  };
}
