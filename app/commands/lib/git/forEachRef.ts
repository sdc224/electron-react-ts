import { GitError } from 'dugite';
import { Branch, BranchType } from '../../models/branch';
import { ForkedRemotePrefix } from '../../models/remote';
import CommitIdentity from '../../models/commitIdentity';
import { Commit } from '../../models/commit';
import { git } from '../../gitTerminal';
import {
  getTrailerSeparatorCharacters,
  parseRawUnfoldedTrailers
} from './interpretTrailers';

const ForksReferencesPrefix = `refs/remotes/${ForkedRemotePrefix}`;

/** Get all the branches. */
// eslint-disable-next-line import/prefer-default-export
export async function getBranches(
  repository: IRepository,
  ...prefixes: string[]
): Promise<ReadonlyArray<Branch>> {
  const delimiter = '1F';
  const delimiterString = String.fromCharCode(parseInt(delimiter, 16));
  let modifiedPrefixes = prefixes;

  const format = [
    '%(refname)',
    '%(refname:short)',
    '%(upstream:short)',
    '%(objectname)', // SHA
    '%(objectname:short)', // short SHA
    '%(author)',
    '%(committer)',
    '%(parent)', // parent SHAs
    '%(symref)',
    '%(subject)',
    '%(body)',
    '%(trailers:unfold,only)',
    `%${delimiter}` // indicate end-of-line as %(body) may contain newlines
  ].join('%00');

  if (!prefixes || !prefixes.length) {
    modifiedPrefixes = ['refs/heads', 'refs/remotes'];
  }

  // TODO: use expectedErrors here to handle a specific error
  // see https://github.com/desktop/desktop/pull/5299#discussion_r206603442 for
  // discussion about what needs to change
  const result = await git(
    ['for-each-ref', `--format=${format}`, ...modifiedPrefixes],
    repository.repoPath,
    'getBranches',
    { expectedErrors: new Set([GitError.NotAGitRepository]) }
  );

  if (result.gitError === GitError.NotAGitRepository) {
    return [];
  }

  const names = result.stdout;
  const lines = names.split(delimiterString);

  // Remove the trailing newline
  lines.splice(-1, 1);

  if (lines.length === 0) {
    return [];
  }

  const trailerSeparators = await getTrailerSeparatorCharacters(repository);

  const branches = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [ix, line] of lines.entries()) {
    // preceding newline character after first row
    const pieces = (ix > 0 ? line.substr(1) : line).split('\0');

    const ref = pieces[0];
    const name = pieces[1];
    const upstream = pieces[2];
    const sha = pieces[3];
    const shortSha = pieces[4];

    const authorIdentity = pieces[5];
    const author = CommitIdentity.parseIdentity(authorIdentity);

    if (!author) {
      throw new Error(`Couldn't parse author identity for '${shortSha}'`);
    }

    const committerIdentity = pieces[6];
    const committer = CommitIdentity.parseIdentity(committerIdentity);

    if (!committer) {
      throw new Error(`Couldn't parse committer identity for '${shortSha}'`);
    }

    const parentSHAs = pieces[7].split(' ');
    const symref = pieces[8];
    const summary = pieces[9];
    const body = pieces[10];
    const trailers = parseRawUnfoldedTrailers(pieces[11], trailerSeparators);

    const tip = new Commit(
      sha,
      shortSha,
      summary,
      body,
      author,
      committer,
      parentSHAs,
      trailers
    );

    const type = ref.startsWith('refs/head')
      ? BranchType.Local
      : BranchType.Remote;

    if (symref.length > 0) {
      // excude symbolic refs from the branch list
      // eslint-disable-next-line no-continue
      continue;
    }

    if (ref.startsWith(ForksReferencesPrefix)) {
      // hide refs from our known remotes as these are considered plumbing
      // and can add noise to everywhere in the user interface where we
      // display branches as forks will likely contain duplicates of the same
      // ref names
      // eslint-disable-next-line no-continue
      continue;
    }

    branches.push(
      new Branch(name, upstream.length > 0 ? upstream : null, tip, type)
    );
  }

  return branches;
}
