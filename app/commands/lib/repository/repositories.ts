import { folderOrFileExist } from '@app/utils/fileHelper';
import { resolve } from 'path';
import GitlabEnterprise from '../gitlab/enterprise';

export default class RepositoryHelper {
  private repositories = new Array<IRepository>();

  constructor(
    // TODO : Design pattern
    private gitlab: GitlabEnterprise,
    private basePath: string
  ) {}

  private getRepoPath = (projectSchema: GitlabProjectSchema) =>
    resolve(this.basePath, projectSchema.name);

  private isClonedRepository = (repoPath: string) =>
    folderOrFileExist(repoPath) &&
    folderOrFileExist(resolve(repoPath, './.git'));

  private isForkableRepository = (
    projectSchema: GitlabProjectSchema,
    user: GitlabUser
  ) => !!projectSchema.owner && projectSchema.owner!.id === user.id;

  private fetchAllGitlabProjects = async () => {
    try {
      const allProjects = await this.gitlab.getAllProjects();
      const user = await this.gitlab.getCurrentUser();
      await Promise.all(
        allProjects.map(async project => {
          const repoPath = this.getRepoPath(project);
          const isCloned = await this.isClonedRepository(repoPath);
          const isForkable = this.isForkableRepository(project, user);

          this.repositories.push({
            ...project,
            repoPath,
            // TODO : better logic so that we can clone cloud repo also
            hasDotGitFolder: isForkable && isCloned,
            isCurrentUserProject: isForkable,
            remote: {
              origin: { name: 'origin', url: project.ssh_url_to_repo },
              central: {
                name: 'central',
                url: project.forked_from_project?.ssh_url_to_repo!
              }
            }
          });
        })
      );
    } catch (error) {
      throw new Error(`Error${error}`);
    }
  };

  public getAllProjects = async () => {
    // TODO : init method using decorator
    await this.fetchAllGitlabProjects();
    return this.repositories;
  };

  public getCloneableProjects = async () => {
    const res = await this.getAllProjects();
    return res.filter(r => r.isCurrentUserProject);
  };

  public getForkableProjects = async () => {
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
}
