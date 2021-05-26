import { Request, Response } from 'express';

import { Repo } from '../entity/Repo';
import { User } from '../entity/User';
import { RepoView } from '../views/RepoView';

export const RepoController = {
  async index(request: Request, response: Response) {
    const { userEmail } = request.query;

    try {
      const user = await User.findOne({ where: { email: userEmail } });

      const repos = await Repo.find({ where: { owner: user } });

      return response.json(RepoView.renderMany(repos));
    } catch (error) {
      console.error(error);

      return response.status(400).json({ error: 'Erro ao listar repositórios' });
    }
  },

  async detail(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const repo = await Repo.findOne(id);

      if (!repo) {
        return response.status(404).json({ error: 'Repositório não encontrado' });
      }

      return response.json(RepoView.render(repo));
    } catch (error) {
      console.error(error);

      return response.status(400).json({ error: 'Erro ao buscar dados do repositório' });
    }
  },

  async create(request: Request, response: Response) {
    const {
      name, description, visibility, userEmail,
    } = request.body;

    try {
      const owner = await User.findOne({ where: { email: userEmail } });

      const repo = Repo.create({
        name, description, visibility, owner,
      });

      await repo.save();

      return response.status(201).json(RepoView.render(repo));
    } catch (error) {
      console.error(error);

      return response.status(400).json({ error: 'Erro ao criar repositório' });
    }
  },

  async patch(request: Request, response: Response) {
    const { id } = request.params;

    const {
      name, description, visibility, userEmail,
    } = request.body;

    try {
      const owner = await User.findOne({ where: { email: userEmail } });

      if (userEmail && !owner) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      const repo = await Repo.findOne(id);

      repo.name = name ?? repo.name;
      repo.description = description ?? repo.description;
      repo.visibility = visibility ?? repo.visibility;
      repo.owner = owner ?? repo.owner;

      await repo.save();

      return response.status(204).send();
    } catch (error) {
      console.error(error);

      return response.status(400).json({ error: 'Erro ao editar repositório' });
    }
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await Repo.delete(id);

      return response.status(204).send();
    } catch (error) {
      console.error(error);

      return response.status(400).json({ error: 'Erro ao deletar repositório' });
    }
  },
};
