import { IGitResult, GitError as DugiteError } from 'dugite';

export interface IGitResultMessage extends IGitResult {
  /**
   * The parsed git error. This will be null when the exit code is included in
   * the `successExitCodes`, or when dugite was unable to parse the
   * error.
   */
  readonly gitError: DugiteError | null;

  /** The human-readable error description, based on `gitError`. */
  readonly gitErrorDescription: string | null;

  /**
   * The path that the Git command was executed from, i.e. the
   * process working directory (not to be confused with the Git
   * working directory which is... super confusing, I know)
   */
  readonly path: string;
}

function getResultMessage(result: IGitResultMessage) {
  const description = result.gitErrorDescription;
  if (description) {
    return description;
  }

  if (result.stderr.length) {
    return result.stderr;
  }
  if (result.stdout.length) {
    return result.stdout;
  }

  return 'Unknown error';
}

export class GitError extends Error {
  /** The result from the failed command. */
  public readonly result: IGitResultMessage;

  /** The args for the failed command. */
  public readonly args: ReadonlyArray<string>;

  public constructor(result: IGitResultMessage, args: ReadonlyArray<string>) {
    super(getResultMessage(result));

    this.name = 'GitError';
    this.result = result;
    this.args = args;
  }
}
