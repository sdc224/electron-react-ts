import { Gitlab } from '@gitbeaker/browser';
import { IForkProgress } from '../progress/definitions';

export default class GitlabOperations {
  constructor(private gitlab: InstanceType<typeof Gitlab>) {}

  private getCurrentUser = async () => {
    const res = await this.gitlab.Users.current();
    return res as GitlabUser;
  };

  public getAllProjects = async () => {
    const user = await this.getCurrentUser();
    // TODO : Add Pagination
    const res = (await this.gitlab.Projects.all({
      perPage: 100
    })) as GitlabProjectSchema[];
    const responseWithUser = res.map(p => ({
      ...p,
      isCurrentUserProject: !!p && !!p.owner && p.owner!.id === user.id
    }));
    return responseWithUser;
  };

  /**
   * getClonableProjects
   */
  public getClonableProjects = async () => {
    // TODO : Waiting for gitlab API method without filter
    const res = (await this.getAllProjects()).filter(
      p => p.isCurrentUserProject
    );
    return res;
  };

  /**
   * getForkableProjects
   */
  public getForkableProjects = async () => {
    // TODO : Waiting for gitlab API method without filter
    const res = await this.getAllProjects();
    const forkerProjectsArray: number[] = [];
    res.forEach(p => {
      if (p.isCurrentUserProject && p.forked_from_project)
        forkerProjectsArray.push(p.forked_from_project.id);
    });

    const filteredCurrentUserProjects = res.filter(
      p => !p.isCurrentUserProject
    );

    const filteredForkerProjects = filteredCurrentUserProjects.filter(
      element => !forkerProjectsArray.includes(element.id)
    );
    return filteredForkerProjects;
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
      throw new Error(error);
    }
  };
}
