import { Repo } from '../entity/Repo';

export class RepoView {
  static render(repo: Repo) {
    const {
      id, name, description, visibility, owner,
    } = repo;

    return {
      id,
      name,
      description,
      visibility,
      owner,
    };
  }

  static renderMany(repos: Repo[]) {
    return repos.map((repo) => this.render(repo));
  }
}
