import Git from '@commands/lib/git';
import { IForkUpdateOptions } from '@commands/models/forkUpdate';
import { IProgressBarSelector } from '../../ducks/progress/types';

/** The store in charge of repository currently being fork updated. */
export default class ForkUpdateRepositoryStore {
  // TODO : For multiple repository cloning
  //  private readonly _repositories = new Array<CloningRepository>();
  // private readonly stateByID = new Map<number, ICloneProgress>();

  // TODO : interface for Clone and Progress, to separate out logic from Progress and Clone
  constructor(
    private readonly gitObject: Git,
    private readonly progressState: IProgressBarSelector
  ) {}

  /**
   * Fork Update the repository.
   *
   * @returns {Promise<boolean>} which resolves to whether the process was successful.
   */
  public forkUpdate = async (
    repository: IRepository,
    options: IForkUpdateOptions
  ): Promise<{
    success: boolean;
    output: string;
  }> => {
    if (!this.gitObject) {
      throw new Error('Git object is not defined');
    }

    const title = `Initialising`;
    // TODO : Detailed Fork Update
    this.progressState.handleProgress({
      kind: 'fork-update',
      title,
      value: 0
    });

    let success = true;
    let stdout = '';
    try {
      this.progressState.handleProgress({
        kind: 'fork-update',
        title: 'Fetching',
        // title: getErrorMessage(e),
        value: 0.05
      });

      await this.gitObject.fetch(repository, repository.remote.central?.name!);

      this.progressState.handleProgress({
        kind: 'fork-update',
        title: 'Checkouting',
        // title: getErrorMessage(e),
        value: 0.45
      });

      await this.gitObject.checkoutBranch(repository, options.forkBranch);

      this.progressState.handleProgress({
        kind: 'fork-update',
        title: 'Merging',
        // title: getErrorMessage(e),
        value: 0.6
      });

      stdout = (
        await this.gitObject.merge(repository, options.cloudBranch.upstream!)
      ).stdout;

      this.progressState.handleProgress({
        kind: 'fork-update',
        title: 'Pushing',
        // title: getErrorMessage(e),
        value: 0.8
      });

      await this.gitObject.push(
        repository,
        repository.remote.origin.name,
        options.forkBranch.nameWithoutRemote,
        options.cloudBranch.nameWithoutRemote
      );
    } catch (e) {
      success = false;
      this.progressState.handleProgress({
        kind: 'clone',
        error: e,
        title: 'An Error Occurred',
        // title: getErrorMessage(e),
        value: 0
      });
      throw e;

      // TODO : Retry Module
      // const retryAction: RetryAction = {
      //   type: RetryActionType.Clone,
      //   url,
      //   path,
      //   options
      // };
      // e = new ErrorWithMetadata(e, {
      //   retryAction,
      //   repository
      // });
    }

    // this.remove(repository);

    return { success, output: stdout };
  };
}
