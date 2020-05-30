// TODO : URL Parser
// import gitUrlParse from 'git-url-parse';
import {
  ICloneProgress,
  IFetchProgress,
  IPushProgress
} from '../progress/definitions';
import { clone } from './clone';
import { fetch, fetchRefspec } from './fetch';
import { setRemoteURL, removeRemote, addRemote, getRemotes } from './remote';
import { checkoutBranch, ProgressCallback, checkoutPaths } from './checkout';
import { Branch } from '../../models/branch';
import { merge, getMergeBase, abortMerge, isMergeHeadSet } from './merge';
import { PushOptions, push } from './push';
import { getBranches } from './forEachRef';

// TODO : auth
// import { IAuth } from '../authentication';

// TODO Error Handling

interface IGit {
  // readonly auth: IAuth;
  init(): void;
}

export default class Git implements IGit {
  // auth: IAuth;
  // private readonly error: IError;
  // private readonly exception: IException;
  // private readonly performance: IPerformance;
  // private readonly execution: IExecution;

  // private gitVersion = '';

  // private async checkGitExists() {
  //   if (isObjectEmpty(this.gitTerminal))
  //     throw new Error('Git Terminal not defined');

  //   try {
  //     const res = await this.gitTerminal.execute('', ['--version']);
  //     this.gitVersion = res
  //       .trim()
  //       .split('\n')
  //       .filter((line: string) => !!line)
  //       .map(this.setGitVersion)
  //       .join();
  //   } catch (error) {
  //     throw new Error('Git is not installed');
  //   }
  // }

  // private setGitVersion = (line: string) => {
  //   if (RegularExpressions.GitVersion.test(line)) {
  //     return line.match(/(\w+\.)+\w+/g)![0];
  //   }

  //   return null;
  // };

  // TODO : to be used in future
  // private parseUrl = (url: string) => {
  //   try {
  //     const parsedUrl = gitUrlParse(url).toString();
  //     return parsedUrl.includes(' ') ? encodeURI(parsedUrl) : parsedUrl;
  //   } catch (error) {
  //     throw new Error('Git URL Parsing failed');
  //   }
  // };

  public init = async () => {
    // await this.checkGitExists();
  };

  // public getGitVersion = () => !!this.gitVersion;

  /**
   * Clones a repository from a given url into to the specified path.
   *
   * @param url     - The remote repository URL to clone from
   *
   * @param repoPath    - The destination path for the cloned repository. If the
   *                  path does not exist it will be created. Cloning into an
   *                  existing directory is only allowed if the directory is
   *                  empty.
   *
   * @param options  - Options specific to the clone operation, see the
   *                   documentation for CloneOptions for more details.
   *
   * @param progressCallback - An optional function which will be invoked
   *                           with information about the current progress
   *                           of the clone operation. When provided this enables
   *                           the '--progress' command line flag for
   *                           'git clone'.
   *
   */
  public clone = (
    url: string,
    repoPath: string,
    options: {},
    // options: CloneOptions,
    progressCallback?: (progress: ICloneProgress) => void
  ): Promise<void> => clone(url, repoPath, options, progressCallback);

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
  public fetch = (
    repository: IRepository,
    // account: IGitAccount | null,
    remote: string,
    progressCallback?: (progress: IFetchProgress) => void
  ): Promise<void> => fetch(repository, remote, progressCallback);

  /** Fetch a given refspec from the given remote. */
  public fetchRefspec = (
    repository: IRepository,
    // account: IGitAccount | null,
    remote: string,
    refspec: string
  ): Promise<void> => fetchRefspec(repository, remote, refspec);

  /** List all branches for a specific repository */
  public getBranches = (
    repository: IRepository,
    ...prefixes: string[]
  ): Promise<ReadonlyArray<Branch>> => getBranches(repository, ...prefixes);

  /**
   * List the remotes, sorted alphabetically by `name`, for a repository.
   */
  public getRemotes = (
    repository: IRepository
  ): Promise<ReadonlyArray<IRemote>> => getRemotes(repository);

  /** Add a new remote with the given URL. */
  public addRemote = (
    repository: IRepository,
    name: string,
    url: string
  ): Promise<IRemote> => addRemote(repository, name, url);

  /** Removes an existing remote, or silently errors if it doesn't exist */
  public removeRemote = (
    repository: IRepository,
    name: string
  ): Promise<void> => removeRemote(repository, name);

  /** Changes the URL for the remote that matches the given name  */
  public setRemoteURL = (
    repository: IRepository,
    name: string,
    url: string
  ): Promise<true> => setRemoteURL(repository, name, url);

  public checkoutBranch = (
    repository: IRepository,
    // account: IGitAccount | null,
    branch: Branch,
    progressCallback?: ProgressCallback
  ): Promise<true> => checkoutBranch(repository, branch, progressCallback);

  public checkoutPaths = (
    repository: IRepository,
    paths: ReadonlyArray<string>
  ): Promise<void> => checkoutPaths(repository, paths);

  public merge = (repository: IRepository, branch: string): Promise<boolean> =>
    merge(repository, branch);

  public getMergeBase = (
    repository: IRepository,
    firstCommitish: string,
    secondCommitish: string
  ): Promise<string | null> =>
    getMergeBase(repository, firstCommitish, secondCommitish);

  public abortMerge = (repository: IRepository): Promise<void> =>
    abortMerge(repository);

  public isMergeHeadSet = (repository: IRepository): Promise<boolean> =>
    isMergeHeadSet(repository);

  public push = (
    repository: IRepository,
    // account: IGitAccount | null,
    remote: string,
    localBranch: string,
    remoteBranch: string | null,
    options?: PushOptions,
    progressCallback?: (progress: IPushProgress) => void
  ): Promise<void> =>
    push(
      repository,
      remote,
      localBranch,
      remoteBranch,
      options,
      progressCallback
    );
}
