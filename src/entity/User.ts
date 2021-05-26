import {
  BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

import { Repo } from './Repo';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatarUrl: string;

  @OneToMany(() => Repo, (repo) => repo.owner)
  @JoinColumn()
  repos: Repo[]
}
