import {
  BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './User';
import { Model } from './Model';

enum RepoVisibility {
  Public,
  Private,
}

@Entity()
export class Repo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  visibility: RepoVisibility;

  @ManyToOne(() => User, (owner) => owner.repos)
  @JoinColumn()
  owner: User;

  @OneToMany(() => Model, (model) => model.repo)
  models: Model[]
}
