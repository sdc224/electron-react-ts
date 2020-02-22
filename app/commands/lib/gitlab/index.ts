import { Gitlab, ProjectSchema } from 'gitlab';
import IUser from './interfaces';
import { IForkProgress } from '../progress/definitions';

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

  /**
   * getForkableProjects
   */
  public getForkableProjects = async () => {
    const user = await this.getCurrentUser();
    // TODO : Waiting for gitlab API method without filter
    const res = (await this.getAllProjects()).filter(
      p => !!p && (!p.owner || p.owner!.id !== user.id)
    );
    return res;
  };

  // TODO : Change Return Type based on gitlab API
  /**
   * fork
   */
  public fork = async (
    project: ProjectSchema,
    progressCallback: (progress: IForkProgress) => void
  ) => {
    const title = 'Forking';
    const description = 'Forking into your namespace';
    const kind = 'fork';

    progressCallback({ title, kind, description, value: 0 });
    try {
      const res = await this.gitlab.Projects.fork(project.id);
      progressCallback({
        kind,
        title: 'Fork Complete',
        description: 'Forking Successfully Completed',
        value: 100
      });
      return res;
    } catch (error) {
      progressCallback({
        kind,
        title: 'Forking Failed',
        description: error,
        value: 0
      });
      return null;
    }
  };
}
