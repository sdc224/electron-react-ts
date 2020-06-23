import CacheStore from 'electron-store';
import {
  PaginatedRequestOptions,
  PaginationOptions
} from '@gitbeaker/core/dist/types/infrastructure/RequestHelper';
import { Branch, BranchType } from '@commands/models/branch';
import { Commit } from '@commands/models/commit';
import CommitIdentity from '@commands/models/commitIdentity';
import { folderOrFileExist } from '@utils/fileHelper';
import { resolve } from 'path';
import GitlabPersonal from '../gitlab/personal';
import GitlabEnterprise from '../gitlab/enterprise';
import Git from '../git';

export default class RepositoryHelper {
  public static repositories = new Array<IRepository>();

  public static gitlab: GitlabPersonal | GitlabEnterprise;

  public static basePath: string;

  private pagination?: PaginationOptions;

  private store = new CacheStore();

  // eslint-disable-next-line class-methods-use-this
  public get repositories() {
    return RepositoryHelper.repositories;
  }

  // eslint-disable-next-line class-methods-use-this
  public get gitlab() {
    return RepositoryHelper.gitlab;
  }

  // eslint-disable-next-line class-methods-use-this
  public set gitlab(gitlab: GitlabPersonal | GitlabEnterprise) {
    RepositoryHelper.gitlab = gitlab;
  }

  // eslint-disable-next-line class-methods-use-this
  public get basePath() {
    return RepositoryHelper.basePath;
  }

  // eslint-disable-next-line class-methods-use-this
  public set basePath(basePath: string) {
    RepositoryHelper.basePath = basePath;
  }

  constructor(
    gitlabParam?: GitlabPersonal | GitlabEnterprise,
    basePathParam?: string
  ) {
    if (!this.gitlab) {
      if (!gitlabParam) throw new Error('gitlabParam should be passed');
      this.gitlab = gitlabParam;
    }

    if (!this.basePath) {
      if (!basePathParam) throw new Error('basePathParam should be passed');
      this.basePath = basePathParam;
    }
  }

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
            origin: {
              name: 'origin',
              url: project.ssh_url_to_repo
            },
            central: {
              name: 'central',
              url: project.forked_from_project?.ssh_url_to_repo!
            }
          },
          extraRemotes: []
        });
      })
    );
  };

  public getAllProjects = async (
    paginatedRequestOption?: PaginatedRequestOptions
  ) => {
    // TODO : init method using decorator
    if (this.repositories?.length <= 0)
      await this.fetchAllGitlabProjects(paginatedRequestOption);
    return {
      projects: this.repositories,
      pagination: this.pagination
    };
  };

  public getCloneableProjects = async () => {
    const res = await this.getAllProjects();
    return {
      projects: res?.projects?.filter((r) => r.isCurrentUserProject),
      pagination: this.pagination
    };
  };

  public getForkableProjects = async () => {
    const res = await this.getAllProjects();

    const forkerProjectsArray: number[] = [];

    res?.projects?.forEach((p) => {
      if (p.isCurrentUserProject && p.forked_from_project)
        forkerProjectsArray.push(p.forked_from_project.id);
    });

    const filteredCurrentUserProjects = res?.projects?.filter(
      (p) => !p.isCurrentUserProject
    );

    const filteredForkerProjects = filteredCurrentUserProjects.filter(
      (element) => !forkerProjectsArray.includes(element.id)
    );
    return {
      projects: filteredForkerProjects,
      pagination: this.pagination
    };
  };

  public addCentralRemote = async (git: Git, id: string | number) => {
    if (this.repositories?.length <= 0)
      throw new Error('Repositories not found');

    const project = this.repositories.find((a) => a.id === id);

    if (!project) return null;

    try {
      await git.addRemote(
        project,
        project?.remote.central?.name!,
        project?.remote.central?.url!
      );

      return true;
    } catch (error1) {
      // info remote already added
      try {
        await git.setRemoteURL(
          project,
          project?.remote.central?.name!,
          project?.remote.central?.url!
        );

        return true;
      } catch (error2) {
        throw new Error('Remote adding failed');
      }
    }
  };

  public addExtraRemotes = async (git: Git, id: string | number) => {
    if (this.repositories?.length <= 0)
      throw new Error('Repositories not found');

    const existingRemotes = this.repositories.find((a) => a.id === id);

    const remotes = (await git.getRemotes(existingRemotes!)) as IRemote[];

    const repoIndex = this.repositories.indexOf(existingRemotes!);

    const modifiedRemotes = remotes.filter(
      (r) =>
        r.name !== existingRemotes?.remote?.central?.name &&
        r.name !== existingRemotes?.remote?.origin.name
    );

    this.repositories[repoIndex].extraRemotes = modifiedRemotes;
  };

  public addBranches = async (id: string | number) => {
    if (this.repositories?.length <= 0)
      throw new Error('Repositories not found');

    const project = this.repositories.find((a) => a.id === id);
    const projectIndex = this.repositories.indexOf(project!);

    try {
      const cloudBranches = await this.gitlab.getAllBranches(
        project?.forked_from_project?.id!
      );

      const branches: Branch[] = [];

      cloudBranches?.forEach((cloudBranch) => {
        const author = new CommitIdentity(
          cloudBranch.commit?.authorName!,
          cloudBranch.commit?.authorEmail!,
          cloudBranch.commit?.authoredDate!
        );

        const committer = new CommitIdentity(
          cloudBranch.commit?.committerName!,
          cloudBranch.commit?.committerEmail!,
          cloudBranch.commit?.committedDate!
        );

        const branch = new Branch(
          cloudBranch.name,
          `central/${cloudBranch.name}`,
          new Commit(
            cloudBranch.commit?.id!,
            cloudBranch.commit?.shortId!,
            cloudBranch.commit?.title!,
            cloudBranch.commit?.message!,
            author,
            committer,
            cloudBranch.commit?.parentIds!
          ),
          BranchType.Remote,
          cloudBranch.canPush,
          cloudBranch.defaultBranch,
          cloudBranch.developersCanMerge,
          cloudBranch.developersCanPush,
          cloudBranch.protectedBranch
        );

        branches.push(branch);
      });

      this.repositories[projectIndex].branches = branches;

      return branches;
    } catch (err) {
      throw new Error('Adding branch failed');
    }
  };
}
