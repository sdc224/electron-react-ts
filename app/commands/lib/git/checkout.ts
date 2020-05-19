import { git } from '../../gitTerminal';
import { ICheckoutProgress } from '../progress/definitions';
import { Branch, BranchType } from '../../models/branch';
import { IGitExecutionOptions } from '../execution';
import { AuthenticationErrors } from './authentication';
import executionOptionsWithProgress from '../progress/readSTD';
import CheckoutProgressParser from '../progress/checkout';

export type ProgressCallback = (progress: ICheckoutProgress) => void;

async function getCheckoutArgs(
  // repository: IRepository,
  branch: Branch,
  // account: IGitAccount | null,
  progressCallback?: ProgressCallback
) {
  // const networkArguments = await gitNetworkArguments(repository, account);

  const baseArgs =
    progressCallback != null ? ['checkout', '--progress'] : ['checkout'];

  // TODO : Add network arguments
  // const baseArgs =
  //   progressCallback != null
  //     ? [...networkArguments, 'checkout', '--progress']
  //     : [...networkArguments, 'checkout'];

  // TODO
  // if (enableRecurseSubmodulesFlag()) {
  //   return branch.type === BranchType.Remote
  //     ? baseArgs.concat(
  //         branch.name,
  //         '-b',
  //         branch.nameWithoutRemote,
  //         '--recurse-submodules',
  //         '--'
  //       )
  //     : baseArgs.concat(branch.name, '--recurse-submodules', '--');
  // } else {
  return branch.type === BranchType.Remote
    ? baseArgs.concat(branch.name, '-b', branch.nameWithoutRemote, '--')
    : baseArgs.concat(branch.name, '--');
}

/**
 * Check out the given branch.
 *
 * @param repository - The repository in which the branch checkout should
 *                     take place
 *
 * @param branch     - The branch name that should be checked out
 *
 * @param progressCallback - An optional function which will be invoked
 *                           with information about the current progress
 *                           of the checkout operation. When provided this
 *                           enables the '--progress' command line flag for
 *                           'git checkout'.
 */
export async function checkoutBranch(
  repository: IRepository,
  // account: IGitAccount | null,
  branch: Branch,
  progressCallback?: ProgressCallback
): Promise<true> {
  let opts: IGitExecutionOptions = {
    // env: envForAuthentication(account),
    expectedErrors: AuthenticationErrors
  };

  if (progressCallback) {
    const title = `Checking out branch ${branch.name}`;
    const kind = 'checkout';
    const targetBranch = branch.name;

    opts = await executionOptionsWithProgress(
      { ...opts, trackLFSProgress: true },
      new CheckoutProgressParser(),
      progress => {
        if (progress.kind === 'progress') {
          const description = progress.details.text;
          const value = progress.percent;

          progressCallback({ kind, title, description, value, targetBranch });
        }
      }
    );

    // Initial progress
    progressCallback({ kind, title, value: 0, targetBranch });
  }

  const args = await getCheckoutArgs(
    // repository,
    branch,
    // account,
    progressCallback
  );

  await git(args, repository.repoPath, 'checkoutBranch', opts);
  // we return `true` here so `GitStore.performFailableGitOperation`
  // will return _something_ differentiable from `undefined` if this succeeds
  return true;
}

/** Check out the paths at HEAD. */
export async function checkoutPaths(
  repository: IRepository,
  paths: ReadonlyArray<string>
): Promise<void> {
  await git(
    ['checkout', 'HEAD', '--', ...paths],
    repository.repoPath,
    'checkoutPaths'
  );
}
