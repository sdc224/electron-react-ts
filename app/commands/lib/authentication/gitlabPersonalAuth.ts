import { IAuth } from '.';

export default class GitlabPersonalAuth implements IAuth {
  // TODO
  public authenticate = async (): Promise<void> => {
    console.log('Gitlab Personal Authentication');
  };
}
