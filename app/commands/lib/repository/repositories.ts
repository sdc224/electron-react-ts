import CacheStore from 'electron-store';
import {
  PaginatedRequestOptions,
  PaginationOptions
} from '@gitbeaker/core/dist/types/infrastructure/RequestHelper';
import { folderOrFileExist } from '@utils/fileHelper';
import { resolve } from 'path';
import GitlabPersonal from '../gitlab/personal';
import GitlabEnterprise from '../gitlab/enterprise';

export default class RepositoryHelper {
  private repositories = new Array<IRepository>();

  private pagination?: PaginationOptions;

  private store = new CacheStore();

  constructor(
    private gitlab: GitlabPersonal | GitlabEnterprise,
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

  private fetchAllGitlabProjects = async (
    paginatedRequestOption?: PaginatedRequestOptions
  ) => {
    const res = ((await this.gitlab.getAllProjects(
      paginatedRequestOption
    )) as unknown) as GitlabProjectAndPagination;

    const allProjects = res?.data!;

    this.pagination = res?.pagination;

    const user =
      this.store.get('userDetails') || (await this.gitlab.getCurrentUser());

    await Promise.all(
      allProjects.map(async (project: GitlabProjectSchema) => {
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
  };

  public getAllProjects = async (
    paginatedRequestOption?: PaginatedRequestOptions
  ) => {
    // TODO : init method using decorator
    await this.fetchAllGitlabProjects(paginatedRequestOption);
    return { projects: this.repositories, pagination: this.pagination };
  };

  public getCloneableProjects = async () => {
    const res = await this.getAllProjects();
    return {
      projects: res?.projects?.filter(r => r.isCurrentUserProject),
      pagination: this.pagination
    };
  };

  public getForkableProjects = async () => {
    const res = await this.getAllProjects();

    const forkerProjectsArray: number[] = [];

    res?.projects?.forEach(p => {
      if (p.isCurrentUserProject && p.forked_from_project)
        forkerProjectsArray.push(p.forked_from_project.id);
    });

    const filteredCurrentUserProjects = res?.projects?.filter(
      p => !p.isCurrentUserProject
    );

    const filteredForkerProjects = filteredCurrentUserProjects.filter(
      element => !forkerProjectsArray.includes(element.id)
    );
    return { projects: filteredForkerProjects, pagination: this.pagination };
  };
}
