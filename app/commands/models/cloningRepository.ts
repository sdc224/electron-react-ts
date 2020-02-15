import * as Path from 'path';

let CloningRepositoryID = 1;

// TODO : For multiple repository cloning
/** A repository which is currently being cloned. */
export default class CloningRepository {
  public readonly id = (CloningRepositoryID += 1);

  public constructor(
    public readonly path: string,
    public readonly url: string
  ) {}

  public get name(): string {
    return Path.basename(this.url, '.git');
  }

  /**
   * A hash of the properties of the object.
   *
   * Objects with the same hash are guaranteed to be structurally equal.
   */
  public get hash(): string {
    return `${this.id}+${this.path}+${this.url}`;
  }
}
