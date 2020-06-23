import { GitError } from 'dugite';
import { git } from '../../gitTerminal';

/**
 * List the remotes, sorted alphabetically by `name`, for a repository.
 */
export const getRemotes = async (
  repository: IRepository
): Promise<ReadonlyArray<IRemote>> => {
  const result = await git(
    ['remote', '-v'],
    repository.repoPath,
    'getRemotes',
    {
      expectedErrors: new Set([GitError.NotAGitRepository])
    }
  );

  if (result.gitError === GitError.NotAGitRepository) {
    return [];
  }

  const output = result.stdout;
  const lines = output.split('\n');
  const remotes = lines
    .filter((x) => x.endsWith('(fetch)'))
    .map((x) => x.split(/\s+/))
    .map((x) => ({ name: x[0], url: x[1] }));

  return remotes;
};

/** Add a new remote with the given URL. */
export const addRemote = async (
  repository: IRepository,
  name: string,
  url: string
): Promise<IRemote> => {
  await git(['remote', 'add', name, url], repository.repoPath, 'addRemote');

  return { url, name };
};

/** Removes an existing remote, or silently errors if it doesn't exist */
export const removeRemote = async (
  repository: IRepository,
  name: string
): Promise<void> => {
  const options = {
    successExitCodes: new Set([0, 128])
  };

  await git(
    ['remote', 'remove', name],
    repository.repoPath,
    'removeRemote',
    options
  );
};

/** Changes the URL for the remote that matches the given name  */
export const setRemoteURL = async (
  repository: IRepository,
  name: string,
  url: string
): Promise<true> => {
  await git(
    ['remote', 'set-url', name, url],
    repository.repoPath,
    'setRemoteURL'
  );
  return true;
};
