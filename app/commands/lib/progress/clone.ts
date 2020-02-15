import { GitProgressParser } from './git';

// TODO : More smoother animation
/**
 * Highly approximate (some would say outright inaccurate) division
 * of the individual progress reporting steps in a clone operation
 * Source: github desktop
 * Will try to merge with VSCode SVN
 */
const steps: { title: string; weight: number }[] = [
  { title: 'remote: Enumerating objects', weight: 0.2 },
  { title: 'remote: Counting objects', weight: 1 },
  { title: 'remote: Compressing objects', weight: 1 },
  { title: 'remote: Total', weight: 0.3 },
  { title: 'Receiving objects', weight: 0.6 },
  { title: 'Resolving deltas', weight: 0.1 },
  { title: 'Checking out files', weight: 0.2 }
];

/**
 * A utility class for interpreting the output from `git clone --progress`
 * and turning that into a percentage value estimating the overall progress
 * of the clone.
 */
export default class CloneProgressParser extends GitProgressParser {
  public constructor() {
    super(steps);
  }
}
