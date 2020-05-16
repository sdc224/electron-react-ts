interface IDefaultProjectSchema {
  id: number;
  description?: null;
  default_branch: string;
  visibility: string;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  readme_url: string;
  tag_list?: string[] | null;
  owner?: IOwner;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  issues_enabled: boolean;
  open_issues_count: number;
  merge_requests_enabled: boolean;
  jobs_enabled: boolean;
  wiki_enabled: boolean;
  snippets_enabled: boolean;
  can_create_merge_request_in: boolean;
  resolve_outdated_diff_discussions: boolean;
  container_registry_enabled: boolean;
  created_at: string;
  last_activity_at: string;
  creator_id: number;
  namespace: INamespace;
  import_status: string;
  archived: boolean;
  avatar_url: string;
  shared_runners_enabled: boolean;
  forks_count: number;
  forked_from_project?: IDefaultProjectSchema;
  star_count: number;
  runners_token: string;
  ci_default_git_depth: number;
  public_jobs: boolean;
  shared_with_groups?: null[] | null;
  only_allow_merge_if_pipeline_succeeds: boolean;
  only_allow_merge_if_all_discussions_are_resolved: boolean;
  remove_source_branch_after_merge: boolean;
  request_access_enabled: boolean;
  merge_method: string;
  autoclose_referenced_issues: boolean;
  suggestion_commit_message?: null;
  marked_for_deletion_at: string;
  marked_for_deletion_on: string;
  statistics: IStatistics;
  _links: ILinks;
}
interface IOwner {
  id: number;
  name: string;
  created_at: string;
}
interface INamespace {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
}
interface IStatistics {
  commit_count: number;
  storage_size: number;
  repository_size: number;
  wiki_size: number;
  lfs_objects_size: number;
  job_artifacts_size: number;
  packages_size: number;
}
interface ILinks {
  self: string;
  issues: string;
  merge_requests: string;
  repo_branches: string;
  labels: string;
  events: string;
  members: string;
}

interface IIdentitiesEntity {
  provider?: string;
  extern_uid?: string;
}

interface IUser {
  email?: string;
  is_admin?: boolean;
  last_sign_in_at?: string;
  confirmed_at?: string;
  theme_id?: number;
  last_activity_on?: string;
  color_scheme_id?: number;
  projects_limit?: number;
  current_sign_in_at?: string;
  identities?: IIdentitiesEntity[] | null;
  can_create_group?: boolean;
  can_create_project?: boolean;
  two_factor_enabled?: boolean;
  external?: boolean;
  private_profile?: boolean;
  current_sign_in_ip?: string;
  last_sign_in_ip?: string;
}

type GitlabUser = IUser &
  import('@gitbeaker/core/dist/types/services/Users').UserDetailSchema;
