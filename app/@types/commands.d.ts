// TODO : Docs
type BearerType = 'personal' | 'enterprise';

interface IGitlabCredentials {
  host?: string;
  token: string;
  oauthToken?: string;
  jobToken?: string;
  rejectUnauthorized?: boolean;
  sudo?: boolean;
  version?: string;
  camelize?: boolean;
  requester?: object;
  requestTimeout?: number;
  profileToken?: object;
  profileMode?: string;
}

// type MyProjectSchema = ArrayElement<
//   UnwrapPromise<ReturnType<InstanceType<typeof Projects>['all']>>
// >

type GitlabProjectSchema = import('@gitbeaker/core/dist/types/services/Projects').ProjectSchemaCamelized &
  IDefaultProjectSchema;

type GitlabProjectAndPagination = {
  data: GitlabProjectSchema[];
  pagination: import('@gitbeaker/core/dist/types/infrastructure/RequestHelper').PaginationOptions;
};

/** A remote as defined in Git. */
interface IRemote {
  readonly name: string;
  readonly url: string;
}

interface IGitlabBranch {
  canPush: boolean;
  commit?: import('@gitbeaker/core/dist/types/services/Commits').CommitSchemaCamelized & {
    webUrl?: string;
  };
  defaultBranch: boolean;
  developersCanMerge: boolean;
  developersCanPush: boolean;
  merged?: boolean;
  name: string;
  protectedBranch: boolean;
}

interface IHRCRemote {
  origin: IRemote;
  central?: IRemote;
}

interface IRepository extends GitlabProjectSchema {
  repoPath: string;
  hasDotGitFolder: boolean;
  isCurrentUserProject: boolean;
  remote: IHRCRemote;
  extraRemotes: IRemote[];
  branches?: import('@commands/models/branch').Branch[];
}

type RepositoryProjectAndPagination = {
  projects: IRepository[];
  pagination: import('@gitbeaker/core/dist/types/infrastructure/RequestHelper').PaginationOptions;
};
