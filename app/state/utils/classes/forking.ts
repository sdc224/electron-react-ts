// import ForkingRepository from '@commands/models/cloningRepository';
// import { ICloneProgress } from '@commands/lib/progress/definitions';
import GitlabOperations from '@commands/lib/gitlab';
import { IProgressBarSelector } from '../../ducks/progress/types';

/** The store in charge of repository currently being cloned. */
export default class ForkingRepositoriesStore {
  // TODO : For multiple repository forking
  //  private readonly _repositories = new Array<ForkingRepository>();
  // private readonly stateByID = new Map<number, ICloneProgress>();

  // TODO : See cloning.ts
  constructor(
    private readonly gitlabObject: GitlabOperations,
    private progressState: IProgressBarSelector
  ) {}

  /**
   * Clone the repository at the URL to the path.
   *
   * @returns {Promise<boolean>} which resolves to whether the clone was successful.
   */
  public fork = async (
    project: IRepository
    // options: {}
    // options: CloneOptions
  ): Promise<boolean> => {
    if (!this.gitlabObject) {
      throw new Error('Gitlab object is not defined');
    }

    if (!project) throw new Error('No Projects selected');

    // TODO : For multiple repository Forking
    // const repository = new ForkingRepository(path, url);
    //  this._repositories.push(repository);

    const title = `Initialising`;

    // this.stateByID.set(repository.id, {
    //   kind: 'clone',
    //   title,
    //   value: 0
    // });
    // TODO : Detailed Forking
    this.progressState.handleProgress({
      kind: 'fork',
      progressType: 'circular',
      variant: 'indeterminate',
      title,
      value: 0
    });

    let success = true;
    try {
      await this.gitlabObject.fork(project, progress => {
        this.progressState.handleProgress(progress);
        // this.stateByID.set(repository.id, progress);
      });
    } catch (e) {
      success = false;
      this.progressState.handleProgress({
        kind: 'fork',
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

  // TODO : For multiple repository Forking
  /** Get the repositories currently being cloned. */
  //  public get repositories(): ReadonlyArray<ForkingRepository> {
  //    return Array.from(this._repositories);
  //  }

  // TODO : For multiple repository Forking
  /** Get the state of the repository. */
  //  public getRepositoryState(
  //    repository: ForkingRepository
  //  ): ICloneProgress | null {
  //    return this.stateByID.get(repository.id) || null;
  //  }

  // TODO : For multiple repository Forking
  /** Remove the repository. */
  //  public remove(repository: ForkingRepository) {
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
