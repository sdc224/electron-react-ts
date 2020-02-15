import { GitError } from 'dugite';
import { assertNever } from './fatal-errors';

export default function getDescriptionForError(error: GitError): string | null {
  // TODO : Authentication Error Module
  //   if (isAuthFailureError(error)) {
  //     return `Authentication failed. Some common reasons include:

  // - You are not logged in to your account: see ${menuHint}
  // - You may need to log out and log back in to refresh your token.
  // - You do not have permission to access this repository.
  // - The repository is archived on GitHub. Check the repository settings to confirm you are still permitted to push commits.
  // - If you use SSH authentication, check that your key is added to the ssh-agent and associated with your account.`;
  //   }

  // Don't replace your switch statements with Object Literals
  // https://spin.atomicobject.com/2016/11/06/switch-statements-object-literals/
  // const errorMessage = {
  //   [GitError.SSHKeyAuditUnverified]: 'The SSH key is unverified.'
  // };

  switch (error) {
    case GitError.SSHKeyAuditUnverified:
      return 'The SSH key is unverified.';
    case GitError.RemoteDisconnection:
      return 'The remote disconnected. Check your Internet connection and try again.';
    case GitError.HostDown:
      return 'The host is down. Check your Internet connection and try again.';
    case GitError.RebaseConflicts:
      return 'We found some conflicts while trying to rebase. Please resolve the conflicts before continuing.';
    case GitError.MergeConflicts:
      return 'We found some conflicts while trying to merge. Please resolve the conflicts and commit the changes.';
    case GitError.HTTPSRepositoryNotFound:
    case GitError.SSHRepositoryNotFound:
      return 'The repository does not seem to exist anymore. You may not have access, or it may have been deleted or renamed.';
    case GitError.PushNotFastForward:
      return 'The repository has been updated since you last pulled. Try pulling before pushing.';
    case GitError.BranchDeletionFailed:
      return 'Could not delete the branch. It was probably already deleted.';
    case GitError.DefaultBranchDeletionFailed:
      return `The branch is the repository's default branch and cannot be deleted.`;
    case GitError.RevertConflicts:
      return 'To finish reverting, please merge and commit the changes.';
    case GitError.EmptyRebasePatch:
      return 'There aren’t any changes left to apply.';
    case GitError.NoMatchingRemoteBranch:
      return 'There aren’t any remote branches that match the current branch.';
    case GitError.NothingToCommit:
      return 'There are no changes to commit.';
    case GitError.NoSubmoduleMapping:
      return 'A submodule was removed from .gitmodules, but the folder still exists in the repository. Delete the folder, commit the change, then try again.';
    case GitError.SubmoduleRepositoryDoesNotExist:
      return 'A submodule points to a location which does not exist.';
    case GitError.InvalidSubmoduleSHA:
      return 'A submodule points to a commit which does not exist.';
    case GitError.LocalPermissionDenied:
      return 'Permission denied.';
    case GitError.InvalidMerge:
      return 'This is not something we can merge.';
    case GitError.InvalidRebase:
      return 'This is not something we can rebase.';
    case GitError.NonFastForwardMergeIntoEmptyHead:
      return 'The merge you attempted is not a fast-forward, so it cannot be performed on an empty branch.';
    case GitError.PatchDoesNotApply:
      return 'The requested changes conflict with one or more files in the repository.';
    case GitError.BranchAlreadyExists:
      return 'A branch with that name already exists.';
    case GitError.BadRevision:
      return 'Bad revision.';
    case GitError.NotAGitRepository:
      return 'This is not a git repository.';
    case GitError.ProtectedBranchForcePush:
      return 'This branch is protected from force-push operations.';
    case GitError.ProtectedBranchRequiresReview:
      return 'This branch is protected and any changes requires an approved review. Open a pull request with changes targeting this branch instead.';
    case GitError.PushWithFileSizeExceedingLimit:
      return "The push operation includes a file which exceeds GitHub's file size restriction of 100MB. Please remove the file from history and try again.";
    case GitError.HexBranchNameRejected:
      return 'The branch name cannot be a 40-character string of hexadecimal characters, as this is the format that Git uses for representing objects.';
    case GitError.ForcePushRejected:
      return 'The force push has been rejected for the current branch.';
    case GitError.InvalidRefLength:
      return 'A ref cannot be longer than 255 characters.';
    case GitError.CannotMergeUnrelatedHistories:
      return 'Unable to merge unrelated histories in this repository.';
    case GitError.PushWithPrivateEmail:
      return 'Cannot push these commits as they contain an email address marked as private on GitHub.';
    case GitError.LFSAttributeDoesNotMatch:
      return 'Git LFS attribute found in global Git configuration does not match expected value.';
    case GitError.ProtectedBranchDeleteRejected:
      return 'This branch cannot be deleted from the remote repository because it is marked as protected.';
    case GitError.ProtectedBranchRequiredStatus:
      return 'The push was rejected by the remote server because a required status check has not been satisfied.';
    case GitError.BranchRenameFailed:
      return 'The branch could not be renamed.';
    case GitError.PathDoesNotExist:
      return 'The path does not exist on disk.';
    case GitError.InvalidObjectName:
      return 'The object was not found in the Git repository.';
    case GitError.OutsideRepository:
      return 'This path is not a valid path inside the repository.';
    case GitError.LockFileAlreadyExists:
      return 'A lock file already exists in the repository, which blocks this operation from completing.';
    case GitError.NoMergeToAbort:
      return 'There is no merge in progress, so there is nothing to abort.';
    case GitError.NoExistingRemoteBranch:
      return 'The remote branch does not exist.';
    case GitError.LocalChangesOverwritten:
      return 'Unable to switch branches as there are working directory changes which would be overwritten. Please commit or stash your changes.';
    case GitError.UnresolvedConflicts:
      return 'There are unresolved conflicts in the working directory.';
    case GitError.ConfigLockFileAlreadyExists:
      // Added in dugite 1.88.0 (https://github.com/desktop/dugite/pull/386)
      // in support of https://github.com/desktop/desktop/issues/8675 but we're
      // not using it yet. Returning a null message here means the stderr will
      // be used as the error message (or stdout if stderr is empty), i.e. the
      // same behavior as before the ConfigLockFileAlreadyExists was added
      return null;
    case GitError.RemoteAlreadyExists:
      return null;
    default:
      return assertNever(error as never, `Unknown error: ${error}`);
  }
}
