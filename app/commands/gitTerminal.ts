import { GitProcess, GitError as DugiteError } from 'dugite';
import { IGitResultMessage, GitError } from './lib/progress/gitError';
import { IGitExecutionOptions } from './lib/execution';
import isErrnoException from './lib/exception';
import getDescriptionForError from './lib/error/error-desc';

/**
 * Shell out to git with the given arguments, at the given path.
 *
 * @param args             The arguments to pass to `git`.
 *
 * @param path             The working directory path for the execution of the
 *                         command.
 *
 * @param name             The name for the command based on its caller's
 *                         context. This will be used for performance
 *                         measurements and debugging.
 *
 * @param options          Configuration options for the execution of git,
 *                         see IGitExecutionOptions for more information.
 *
 * Returns the result. If the command exits with a code not in
 * `successExitCodes` or an error not in `expectedErrors`, a `GitError` will be
 * thrown.
 */
// eslint-disable-next-line import/prefer-default-export
export async function git(
  args: string[],
  path: string,
  name: string,
  options?: IGitExecutionOptions
): Promise<IGitResultMessage> {
  const defaultOptions: IGitExecutionOptions = {
    successExitCodes: new Set([0]),
    expectedErrors: new Set()
  };

  const opts = { ...defaultOptions, ...options };

  // Explicitly set TERM to 'dumb' so that if Desktop was launched
  // from a terminal or if the system environment variables
  // have TERM set Git won't consider us as a smart terminal.
  // See https://github.com/git/git/blob/a7312d1a2/editor.c#L11-L15
  // opts.env = { TERM: 'dumb', ...opts.env };

  // TODO : Add Performance and Logger
  // const commandName = `${name}: git ${args.join(' ')}`;

  // const result = await GitPerf.measure(commandName, () =>
  //   GitProcess.exec(args, path, opts)
  // ).catch(err => {
  //   // If this is an exception thrown by Node.js (as opposed to
  //   // dugite) let's keep the salient details but include the name of
  //   // the operation.
  //   if (isErrnoException(err)) {
  //     throw new Error(`Failed to execute ${name}: ${err.code}`);
  //   }

  //   throw err;
  // });
  // TODO : Work on dugite, cloning fix in dirname
  const result = await GitProcess.exec(args, path, opts).catch((err) => {
    // If this is an exception thrown by Node.js (as opposed to
    // dugite) let's keep the salient details but include the name of
    // the operation.
    if (isErrnoException(err)) {
      throw new Error(`Failed to execute ${name}: ${err.code}`);
    }

    throw err;
  });

  const { exitCode } = result;

  let gitError: DugiteError | null = null;
  const acceptableExitCode = opts.successExitCodes
    ? opts.successExitCodes.has(exitCode)
    : false;
  if (!acceptableExitCode) {
    gitError = GitProcess.parseError(result.stderr);
    if (!gitError) {
      gitError = GitProcess.parseError(result.stdout);
    }
  }

  const gitErrorDescription = gitError
    ? getDescriptionForError(gitError)
    : null;
  const gitResult = {
    ...result,
    gitError,
    gitErrorDescription,
    path
  };

  let acceptableError = true;
  if (gitError && opts.expectedErrors) {
    acceptableError = opts.expectedErrors.has(gitError);
  }

  if ((gitError && acceptableError) || acceptableExitCode) {
    return gitResult;
  }

  // The caller should either handle this error, or expect that exit code.
  const errorMessage = new Array<string>();
  errorMessage.push(
    `\`git ${args.join(' ')}\` exited with an unexpected code: ${exitCode}.`
  );

  if (result.stdout) {
    errorMessage.push('stdout:');
    errorMessage.push(result.stdout);
  }

  if (result.stderr) {
    errorMessage.push('stderr:');
    errorMessage.push(result.stderr);
  }

  if (gitError) {
    errorMessage.push(
      `(The error was parsed as ${gitError}: ${gitErrorDescription})`
    );
  }

  // TODO : Add Logger
  // log.error(errorMessage.join('\n'));

  throw new GitError(gitResult, args);
}
