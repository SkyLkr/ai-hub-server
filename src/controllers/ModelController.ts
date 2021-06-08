import { Request, Response } from 'express';
import { Model } from '../entity/Model';
import { Repo } from '../entity/Repo';
import { ModelView } from '../views/ModelView';

export const ModelController = {
  async index(request: Request, response: Response) {
    const { repoId } = request.params;

    try {
      const models = await Model.find({ where: { repo: { id: repoId } } });

      return response.json(ModelView.renderMany(models));
    } catch (error) {
      console.error(error);
      return response.status(400).send();
    }
  },

  async detail(request: Request, response: Response) {
    const { repoId, id } = request.params;

    try {
      const model = await Model.findOne({ where: { id, repo: { id: repoId } } });

      if (!model) {
        return response.status(404).json({ error: 'Modelo não encontrado' });
      }

      return response.json(ModelView.render(model));
    } catch (error) {
      console.error(error);
      return response.status(400).send();
    }
  },

  async create(request: Request, response: Response) {
    const { repoId } = request.params;
    const {
      name, description, version, type, metrics, frameworks,
    } = request.body;

    console.log(request.body);

    try {
      const repo = await Repo.findOne(repoId);

      if (!repo) {
        return response.status(404).json({ erro: 'Repositório inválido' });
      }

      const model = Model.create({
        name, description, version, type, metrics, frameworks, repo, file: request.file.filename,
      });

      await model.save();

      return response.status(201).send();
    } catch (error) {
      console.error(error);
      return response.status(400).send();
    }
  },

  async update(request: Request, response: Response) {
    const { repoId, id } = request.params;
    const {
      name, description, version, type, metrics, frameworks,
    } = request.body;

    try {
      const model = await Model.findOne({ where: { id, repo: { id: repoId } } });

      if (!model) {
        return response.status(404).json({ error: 'O modelo não existe' });
      }

      model.name = name ?? model.name;
      model.description = description ?? model.description;
      model.version = version ?? model.version;
      model.type = type ?? model.type;
      model.metrics = metrics ?? model.metrics;
      model.frameworks = frameworks ?? model.frameworks;

      await model.save();

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      return response.status(400).send();
    }
  },

  async delete(request: Request, response: Response) {
    const { repoId, id } = request.params;

    try {
      await Model.delete({ id, repo: { id: repoId } });

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      return response.status(400).send();
    }
  },
};
