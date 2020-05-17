import * as fileExtra from 'fs-extra';
import * as Path from 'path';
import { GitError } from 'dugite';
import { git } from '../../gitTerminal';
// import { Branch } from '../../models/branch';
// import { MergeResult } from '../../models/merge';
// import ComputedAction from '../../models/computedAction';
// import { parseMergeResult } from './mergeHelper';
// import { spawnAndComplete } from './spawn';

const noopMergeMessage = 'Already up to date.\n';

/** Merge the named branch into the current branch. */
export async function merge(
  repository: IRepository,
  branch: string
): Promise<boolean> {
  const { exitCode, stdout } = await git(
    ['merge', branch],
    repository.repoPath,
    'merge',
    {
      expectedErrors: new Set([GitError.MergeConflicts])
    }
  );

  if (exitCode === 0 && stdout !== noopMergeMessage) {
    return true;
  }

  return false;
}

/**
 * Find the base commit between two commit-ish identifiers
 *
 * @returns the commit id of the merge base, or null if the two commit-ish
 *          identifiers do not have a common base
 */
export async function getMergeBase(
  repository: IRepository,
  firstCommitish: string,
  secondCommitish: string
): Promise<string | null> {
  const process = await git(
    ['merge-base', firstCommitish, secondCommitish],
    repository.path,
    'merge-base',
    {
      // - 1 is returned if a common ancestor cannot be resolved
      // - 128 is returned if a ref cannot be found
      //   "warning: ignoring broken ref refs/remotes/origin/master."
      successExitCodes: new Set([0, 1, 128])
    }
  );

  if (process.exitCode === 1 || process.exitCode === 128) {
    return null;
  }

  return process.stdout.trim();
}

/**
 * Generate the merge result from two branches in a repository
 *
 * @param repository The repository containing the branches to merge
 * @param ours The current branch
 * @param theirs Another branch to merge into the current branch
 */
/* export async function mergeTree(
  repository: IRepository,
  ours: Branch,
  theirs: Branch
): Promise<MergeResult | null> {
  const mergeBase = await getMergeBase(
    repository,
    ours.tip.sha,
    theirs.tip.sha
  );

  if (mergeBase === null) {
    return { kind: ComputedAction.Invalid };
  }

  if (mergeBase === ours.tip.sha || mergeBase === theirs.tip.sha) {
    return { kind: ComputedAction.Clean, entries: [] };
  }

  const result = await spawnAndComplete(
    ['merge-tree', mergeBase, ours.tip.sha, theirs.tip.sha],
    repository.path,
    'mergeTree'
  );

  const output = result.output.toString();

  if (output.length === 0) {
    // the merge commit will be empty - this is fine!
    return { kind: ComputedAction.Clean, entries: [] };
  }

  return parseMergeResult(output);
} */

/**
 * Abort a mid-flight (conflicted) merge
 *
 * @param repository where to abort the merge
 */
export async function abortMerge(repository: IRepository): Promise<void> {
  await git(['merge', '--abort'], repository.repoPath, 'abortMerge');
}

/**
 * Check the `.git/MERGE_HEAD` file exists in a repository to confirm
 * that it is in a conflicted state.
 */
export async function isMergeHeadSet(
  repository: IRepository
): Promise<boolean> {
  const path = Path.join(repository.repoPath, '.git', 'MERGE_HEAD');
  return fileExtra.pathExists(path);
}
