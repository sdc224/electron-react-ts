export default class Repository {
  constructor(private repository: IRepository) {}

  public isValidRepo = () => this.repository.hasDotGitFolder;
}
