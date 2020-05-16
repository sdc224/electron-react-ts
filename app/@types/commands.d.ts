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

type GitlabProjectSchema = (import('@gitbeaker/core/dist/types/services/Projects').ProjectSchemaCamelized &
  IDefaultProjectSchema) & {
  isCurrentUserProject?: string;
};
