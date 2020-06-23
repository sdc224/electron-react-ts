export interface ICacheManager {
  [key: string]: any;
}

export interface IDisposable {
  dispose(): void;
}

export class CacheManager implements IDisposable {
  private storage: ICacheManager[] | undefined | null = new Array<
    ICacheManager
  >();

  public add(cache: ICacheManager) {
    this.storage!.push(cache);
  }

  public remove(key: string) {
    this.storage = this.storage?.filter((s) => !s[key]);
  }

  public dispose(): void {
    this.storage = null;
  }
}
