import {
  BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { Repo } from './Repo';

@Entity()
export class Model extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  version: string;

  @Column()
  type: string;

  @Column()
  metrics: string;

  @Column()
  frameworks: string;

  @Column()
  fileUrl: string;

  @ManyToOne(() => Repo, (repo) => repo.models)
  repo: Repo;
}
