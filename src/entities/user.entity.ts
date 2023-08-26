import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RefreshSessionEntity } from './refreshSession.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  username?: string;

  @Column({
    type: 'varchar',
    length: '255',
    nullable: false,
    default: 0,
  })
  password?: string;

  @OneToMany(
    () => RefreshSessionEntity,
    (refreshSession) => refreshSession.user,
  )
  sessions?: RefreshSessionEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: string;
}
