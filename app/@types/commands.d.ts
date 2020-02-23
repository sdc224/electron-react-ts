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
