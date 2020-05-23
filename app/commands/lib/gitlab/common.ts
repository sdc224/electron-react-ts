import CacheStore from 'electron-store';
import { Organizations } from '@commands/models/organization';
import GitlabPersonal from './personal';
import GitlabEnterprise from './enterprise';

export default class GitlabCommon {
  public gitlab: GitlabPersonal | GitlabEnterprise;

  constructor() {
    const store = new CacheStore();
    const isEnterprise = store.get('isEnterprise') as boolean;

    if (isEnterprise)
      this.gitlab = new GitlabEnterprise(
        store.get('organization') as Organizations
      );
    else this.gitlab = new GitlabPersonal();
  }
}
