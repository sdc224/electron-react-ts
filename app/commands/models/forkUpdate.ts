import { Branch } from './branch';

export interface IForkUpdateOptions {
  cloudRemote?: IRemote;
  forkBranch: Branch;
  cloudBranch: Branch;
}
