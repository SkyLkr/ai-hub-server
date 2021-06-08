import { Model } from '../entity/Model';

export class ModelView {
  static render(model: Model) {
    const {
      id, name, description, version, type, metrics, frameworks,
    } = model;

    const fileUrl = `${process.env.APP_URL}/models/${model.file}`;

    return {
      id, name, description, version, type, metrics, frameworks, fileUrl,
    };
  }

  static renderMany(models: Model[]) {
    return models.map((model) => this.render(model));
  }
}
