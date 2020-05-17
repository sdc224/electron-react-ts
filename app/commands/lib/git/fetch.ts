import { git } from '../../gitTerminal';
import { IFetchProgress } from '../progress/definitions';
import { IGitExecutionOptions } from '../execution';
import executionOptionsWithProgress from '../progress/readSTD';
import FetchProgressParser from '../progress/fetch';

const getFetchArgs = async (
  repository: IRepository,
  remote: string,
  // account: IGitAccount | null,
  progressCallback?: (progress: IFetchProgress) => void
) => {
  // TODO : Uncomment those comment lines
  // const networkArguments = await gitNetworkArguments(repository, account);

  // if (enableRecurseSubmodulesFlag()) {
  //   return progressCallback != null
  //     ? [
  //         ...networkArguments,
  //         'fetch',
  //         '--progress',
  //         '--prune',
  //         '--recurse-submodules=on-demand',
  //         remote
  //       ]
  //     : [
  //         ...networkArguments,
  //         'fetch',
  //         '--prune',
  //         '--recurse-submodules=on-demand',
  //         remote
  //       ];
  // } else {

  return progressCallback != null
    ? ['fetch', '--progress', '--prune', remote]
    : ['fetch', '--prune', remote];

  // TODO : Add network args
  // ? [...networkArguments, 'fetch', '--progress', '--prune', remote]
  // : [...networkArguments, 'fetch', '--prune', remote];
};

/**
 * Fetch from the given remote.
 *
 * @param repository - The repository to fetch into
 *
 * @param account    - The account to use when authenticating with the remote
 *
 * @param remote     - The remote to fetch from
 *
 * @param progressCallback - An optional function which will be invoked
 *                           with information about the current progress
 *                           of the fetch operation. When provided this enables
 *                           the '--progress' command line flag for
 *                           'git fetch'.
 */
export const fetch = async (
  repository: IRepository,
  // account: IGitAccount | null,
  remote: string,
  progressCallback?: (progress: IFetchProgress) => void
): Promise<void> => {
  let opts: IGitExecutionOptions = {
    successExitCodes: new Set([0])
    // env: envForAuthentication(account)
  };

  if (progressCallback) {
    const title = `Fetching ${remote}`;
    const kind = 'fetch';

    opts = await executionOptionsWithProgress(
      { ...opts, trackLFSProgress: true },
      new FetchProgressParser(),
      progress => {
        // In addition to progress output from the remote end and from
        // git itself, the stderr output from pull contains information
        // about ref updates. We don't need to bring those into the progress
        // stream so we'll just put on anything we don't know about for now.
        if (progress.kind === 'context') {
          if (!progress.text.startsWith('remote: Counting objects')) {
            return;
          }
        }

        const description =
          progress.kind === 'progress' ? progress.details.text : progress.text;
        const value = progress.percent;

        progressCallback({ kind, title, description, value, remote });
      }
    );

    // Initial progress
    progressCallback({ kind, title, value: 0, remote });
  }

  const args = await getFetchArgs(
    repository,
    remote,
    // account,
    progressCallback
  );
  await git(args, repository.repoPath, 'fetch', opts);
};

/** Fetch a given refspec from the given remote. */
export const fetchRefspec = async (
  repository: IRepository,
  // account: IGitAccount | null,
  remote: string,
  refspec: string
): Promise<void> => {
  const options = {
    successExitCodes: new Set([0, 128])
    // env: envForAuthentication(account)
  };

  // const networkArguments = await gitNetworkArguments(repository, account);

  // const args = [...networkArguments, 'fetch', remote, refspec];
  const args = ['fetch', remote, refspec];

  await git(args, repository.repoPath, 'fetchRefspec', options);
};
