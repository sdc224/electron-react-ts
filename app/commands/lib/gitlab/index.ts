import { Gitlab } from 'gitlab';
import IUser from './interfaces';

export default class GitlabOperations {
  constructor(private gitlab: Gitlab) {}

  private getCurrentUser = async () => {
    const res = await this.gitlab.Users.current();
    return res as IUser;
  };

  public getAllProjects = async () => {
    const res = await this.gitlab.Projects.all();
    return res;
  };

  /**
   * getClonableProjects
   */
  public getClonableProjects = async () => {
    const user = await this.getCurrentUser();
    // TODO : Waiting for gitlab API method without filter
    const res = (await this.getAllProjects()).filter(
      p => !!p && !!p.owner && p.owner!.id === user.id
    );
    return res;
  };
}
