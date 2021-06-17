import { Repo } from '../entity/Repo';

import { UserView } from './UserView';

export class RepoView {
  static render(repo: Repo) {
    const {
      id, name, description, visibility, owner, members,
    } = repo;

    return {
      id,
      name,
      description,
      visibility,
      owner,
      members: members === undefined ? undefined : UserView.renderMany(members),
    };
  }

  static renderMany(repos: Repo[]) {
    return repos.map((repo) => this.render(repo));
  }
}
