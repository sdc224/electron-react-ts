import { Gitlab } from 'gitlab';
import credentials from '@private/credentials';
import { IGit } from '../../git';
import GitlabOperations from '..';

export default class GitlabEnterprise extends GitlabOperations implements IGit {
  // TODO : Convert to Auth -- checkURL and auth object intro
  constructor() {
    // TODO : Validate URL using regex
    super(new Gitlab(credentials));
  }

  // eslint-disable-next-line class-methods-use-this
  public async init(): Promise<void> {
    // TODO : Convert to Auth -- checkURL and auth object intro
    // fetch(this.checkUrl).catch((error: Error) => {
    // fetch(credentials.host!)
    //   .then(r => console.log(r))
    //   .catch((error: Error) => {
    //     this.handleError(error);
    //     throw error;
    //   });
    try {
      const response: Response = await fetch(credentials.host!);
      if (!response) throw new Error('Something went wrong!');
      if (response.status >= 400) {
        if (response!.status === 403) {
          throw new Error('Please connect VPN first!');
        } else if (response!.status >= 500) {
          throw new Error(
            'Sorry guys...server down. Please try after some time'
          );
        }
      } else if (!response.ok) {
        throw new Error('No Internet Connection');
      } else {
        throw new Error('Maybe some other Internet Issue');
      }
    } catch (error) {
      if (/^Failed to fetch/.test(error.message))
        throw new Error(
          'Maybe some network issue(Not connected, DNS Resolve Failure)'
        );
      throw error;
    }
  }
}
