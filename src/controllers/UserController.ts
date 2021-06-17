import { Request, Response } from 'express';

import { User } from '../entity/User';
import { UserView } from '../views/UserView';

export const UserController = {
  async index(request: Request, response: Response) {
    try {
      const users = await User.find();

      return response.json(users);
    } catch (error) {
      console.error(error);

      return response.status(400).json({ error: 'Erro ao listar usuários' });
    }
  },

  async detail(request: Request, response: Response) {
    const { email } = request.params;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      return response.json(UserView.render(user));
    } catch (error) {
      console.error(error);

      return response.status(400).json({ error: 'Erro ao buscar usuário' });
    }
  },

  async create(request: Request, response: Response) {
    const { name, email, avatarUrl } = request.body;

    try {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return response.status(201).send();
      }

      const user = User.create({ name, email, avatarUrl });

      await user.save();

      return response.status(201).send();
    } catch (error) {
      console.error(error);

      return response.status(400).json({ error: 'Erro ao criar usuário' });
    }
  },
};
