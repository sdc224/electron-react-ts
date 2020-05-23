import credentials from '@private/credentials';
import GitlabOperations from '..';
import { IAuth } from '../../authentication';
import GitlabAuth from '../../authentication/gitlabAuth';
import GitlabPersonalAuth from '../../authentication/gitlabPersonalAuth';

export default class GitlabPersonal extends GitlabOperations {
  private auth: IAuth | undefined;

  // Need super call here
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    // TODO : Validate URL using regex
    super();
  }

  public init = async (
    customCredentials?: IGitlabCredentials | Promise<IGitlabCredentials>
  ): Promise<void> => {
    let providedCredentials:
      | IGitlabCredentials
      | Promise<IGitlabCredentials>
      | undefined = customCredentials;
    if (!providedCredentials) providedCredentials = await credentials();
    else providedCredentials = await providedCredentials;
    if (!providedCredentials) throw new Error('First Time User');

    this.setGitlab(providedCredentials);

    //  Decorator Pattern
    this.auth = new GitlabAuth(new GitlabPersonalAuth(providedCredentials));
    await this.auth!.authenticate();
  };
}
