import { Gitlab } from '@gitbeaker/browser';
import { PaginatedRequestOptions } from '@gitbeaker/core/dist/types/infrastructure/RequestHelper';
import { IForkProgress } from '../progress/definitions';

export default class GitlabOperations {
  private gitlab: InstanceType<typeof Gitlab> | undefined;

  public setGitlab = (credential: IGitlabCredentials) => {
    this.gitlab = new Gitlab(credential);
  };

  public getCurrentUser = async () => {
    const res = await this.gitlab!.Users.current();
    return res as GitlabUser;
  };

  public getAllProjects = (pagination?: PaginatedRequestOptions) =>
    this.gitlab!.Projects.all({
      showExpanded: true,
      perPage: 100,
      ...pagination
    });

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

  public getAllBranches = async (id: number | string) => {
    const responseList = (await this.gitlab?.Branches.all(id)) as any[];
    if (!responseList || responseList.length === 0) return null;
    return responseList.map(
      (response) =>
        ({
          canPush: response.can_push,
          commit: {
            authorEmail: response.commit?.author_email,
            authorName: response.commit?.author_name,
            authoredDate: response.commit?.authored_date,
            committedDate: response.commit?.committed_date,
            committerEmail: response.commit?.committed_email,
            committerName: response.commit?.committed_name,
            id: response.commit?.id,
            message: response.commit?.message,
            parentIds: response.commit?.parent_ids,
            shortId: response.commit?.short_id,
            title: response.commit?.title,
            webUrl: response.commit?.web_url
          },
          defaultBranch: response.default,
          developersCanMerge: response.developers_can_merge,
          developersCanPush: response.developers_can_push,
          merged: response.merged,
          name: response.name,
          protectedBranch: response.protected
        } as IGitlabBranch)
    );
  };
}
