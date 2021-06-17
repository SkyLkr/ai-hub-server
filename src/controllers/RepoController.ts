import { Request, Response } from 'express';
import { In } from 'typeorm';

import { Repo } from '../entity/Repo';
import { User } from '../entity/User';
import { RepoView } from '../views/RepoView';

export const RepoController = {
  async index(request: Request, response: Response) {
    const { userEmail } = request.query;

    try {
      const repos = await Repo.find({ relations: ['owner', 'members'] });

      const filteredRepos = repos.filter(
        (repo) => (
          repo.owner.email === userEmail
          || repo.members.some((member) => member.email === userEmail)
        ),
      );

      return response.json(RepoView.renderMany(filteredRepos));
    } catch (error) {
      console.error(error);

      return response.status(400).json({ error: 'Erro ao listar repositórios' });
    }
  },

  async detail(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const repo = await Repo.findOne(id, { relations: ['members'] });

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
      name, description, visibility, userEmail, memberEmails,
    } = request.body;

    try {
      const owner = await User.findOne({ where: { email: userEmail } });

      const members = await User.find({ where: { email: In(memberEmails) } });

      if (userEmail && !owner) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      const repo = await Repo.findOne(id);

      repo.name = name ?? repo.name;
      repo.description = description ?? repo.description;
      repo.visibility = visibility ?? repo.visibility;
      repo.owner = owner ?? repo.owner;
      repo.members = members ?? repo.members;

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
