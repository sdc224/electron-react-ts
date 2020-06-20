import { GitError as DugiteError } from 'dugite';
import { IPushProgress } from '../progress/definitions';
import { AuthenticationErrors } from './authentication';
import { IGitExecutionOptions } from '../execution';
import executionOptionsWithProgress from '../progress/readSTD';
import { GitError } from '../progress/gitError';
import { git } from '../../gitTerminal';
import PushProgressParser from '../progress/push';

export type PushOptions = {
  readonly forceWithLease: boolean;
};

/**
 * Push from the remote to the branch, optionally setting the upstream.
 *
 * @param repository - The repository from which to push
 *
 * @param account - The account to use when authenticating with the remote
 *
 * @param remote - The remote to push the specified branch to
 *
 * @param localBranch - The local branch to push
 *
 * @param remoteBranch - The remote branch to push to
 *
 * @param setUpstream - Whether or not to update the tracking information
 *                      of the specified branch to point to the remote.
 *
 * @param progressCallback - An optional function which will be invoked
 *                           with information about the current progress
 *                           of the push operation. When provided this enables
 *                           the '--progress' command line flag for
 *                           'git push'.
 */
export async function push(
  repository: IRepository,
  // account: IGitAccount | null,
  remote: string,
  localBranch: string,
  remoteBranch: string | null,
  options?: PushOptions,
  progressCallback?: (progress: IPushProgress) => void
): Promise<void> {
  // const networkArguments = await gitNetworkArguments(repository, account);

  const args = [
    // ...networkArguments,
    'push',
    remote,
    remoteBranch ? `${localBranch}:${remoteBranch}` : localBranch
  ];

  if (!remoteBranch) {
    args.push('--set-upstream');
  } else if (options !== undefined && options.forceWithLease) {
    args.push('--force-with-lease');
  }

  const expectedErrors = new Set<DugiteError>(AuthenticationErrors);
  expectedErrors.add(DugiteError.ProtectedBranchForcePush);

  let opts: IGitExecutionOptions = {
    // env: envForAuthentication(account),
    expectedErrors
  };

  if (progressCallback) {
    args.push('--progress');
    const title = `Pushing to ${remote}`;
    const kind = 'push';

    opts = await executionOptionsWithProgress(
      { ...opts, trackLFSProgress: true },
      new PushProgressParser(),
      progress => {
        const description =
          progress.kind === 'progress' ? progress.details.text : progress.text;
        const value = progress.percent;

        progressCallback({
          kind,
          title,
          description,
          value,
          remote,
          branch: localBranch
        });
      }
    );

    // Initial progress
    progressCallback({
      kind: 'push',
      title,
      value: 0,
      remote,
      branch: localBranch
    });
  }

  const result = await git(args, repository.repoPath, 'push', opts);

  if (result.gitErrorDescription) {
    throw new GitError(result, args);
  }
}
