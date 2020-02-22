import Git from '@commands/lib/git';
// import CloningRepository from '@commands/models/cloningRepository';
// import { ICloneProgress } from '@commands/lib/progress/definitions';
import { IProgressBarSelector } from '../progress/types';

/** The store in charge of repository currently being cloned. */
export default class CloningRepositoriesStore {
  // TODO : For multiple repository cloning
  //  private readonly _repositories = new Array<CloningRepository>();
  // private readonly stateByID = new Map<number, ICloneProgress>();

  // TODO : interface for Clone and Progress, to separate out logic from Progress and Clone
  constructor(
    private readonly gitObject: Git,
    private readonly progressState: IProgressBarSelector
  ) {}

  /**
   * Clone the repository at the URL to the path.
   *
   * @returns {Promise<boolean>} which resolves to whether the clone was successful.
   */
  public clone = async (
    url: string,
    path: string,
    options: {}
    // options: CloneOptions
  ): Promise<boolean> => {
    if (!this.gitObject) {
      throw new Error('Git object is not defined');
    }

    // TODO : For multiple repository cloning
    // const repository = new CloningRepository(path, url);
    //  this._repositories.push(repository);

    const title = `Initialising`;

    // this.stateByID.set(repository.id, {
    //   kind: 'clone',
    //   title,
    //   value: 0
    // });
    // TODO : Detailed Cloning
    this.progressState.handleProgress({
      kind: 'clone',
      progressType: 'linear',
      variant: 'determinate',
      title,
      value: 0
    });

    let success = true;
    try {
      await this.gitObject.clone(url, path, options, progress => {
        this.progressState.handleProgress(progress);
        // this.stateByID.set(repository.id, progress);
      });
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

    return success;
  };

  // TODO : For multiple repository cloning
  /** Get the repositories currently being cloned. */
  //  public get repositories(): ReadonlyArray<CloningRepository> {
  //    return Array.from(this._repositories);
  //  }

  // TODO : For multiple repository cloning
  /** Get the state of the repository. */
  //  public getRepositoryState(
  //    repository: CloningRepository
  //  ): ICloneProgress | null {
  //    return this.stateByID.get(repository.id) || null;
  //  }

  // TODO : For multiple repository cloning
  /** Remove the repository. */
  //  public remove(repository: CloningRepository) {
  //    this.stateByID.delete(repository.id);

  //    const repoIndex = this._repositories.findIndex(
  //      r => r.id === repository.id
  //    );
  //    if (repoIndex > -1) {
  //      this._repositories.splice(repoIndex, 1);
  //    }

  //    this.emitUpdate();
  //  }
}
