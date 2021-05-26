import { Request, Response } from 'express';

import { User } from '../entity/User';

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
