import { Model } from '../entity/Model';

export class ModelView {
  static render(model: Model) {
    return model;
  }

  static renderMany(models: Model[]) {
    return models.map((model) => this.render(model));
  }
}
