import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
@Index(['refreshToken'])
@Unique('refreshToken', ['refreshToken'])
export class RefreshSessionEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user?: UserEntity;

  @Column({
    type: 'varchar',
    length: '255',
  })
  refreshToken?: string;

  @Column({
    type: 'integer',
  })
  expiresIn?: number;

  @Column()
  createdAt?: number;
}
