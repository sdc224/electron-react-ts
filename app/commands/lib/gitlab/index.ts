import { Gitlab } from '@gitbeaker/browser';
import { IForkProgress } from '../progress/definitions';

export default class GitlabOperations {
  private gitlab: InstanceType<typeof Gitlab> | undefined;

  public setGitlab = (
    credential: Promise<IGitlabCredentials> | IGitlabCredentials
  ) => {
    this.gitlab = new Gitlab(credential);
  };

  public getCurrentUser = async () => {
    const res = await this.gitlab!.Users.current();
    return res as GitlabUser;
  };

  public getAllProjects = async () => {
    // TODO : Add Pagination
    const res = (await this.gitlab!.Projects.all({
      perPage: 100
    })) as GitlabProjectSchema[];
    return res;
  };

  /**
   * getClonableProjects
   */
  public getClonableProjects = async () => {
    // TODO : Waiting for gitlab API method without filter
  };

  /**
   * getForkableProjects
   */
  public getForkableProjects = async () => {
    // TODO : Waiting for gitlab API method without filter
  };

  // TODO : Change Return Type based on gitlab API
  /**
   * fork
   */
  public fork = async (
    project: GitlabProjectSchema,
    progressCallback: (progress: IForkProgress) => void
  ): Promise<object> => {
    const title = 'Forking';
    const description = 'Forking into your namespace';
    const kind = 'fork';

    progressCallback({ title, kind, description, value: 0 });
    try {
      const res = await this.gitlab!.Projects.fork(project.id);
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
      throw new Error(error);
    }
  };
}
