import { User } from '../entity/User';

export class UserView {
  static render(user: User) {
    const {
      id, name, email, avatarUrl,
    } = user;

    return {
      id,
      name,
      email,
      avatarUrl,
    };
  }

  static renderMany(users: User[]) {
    return users.map((user) => this.render(user));
  }
}
