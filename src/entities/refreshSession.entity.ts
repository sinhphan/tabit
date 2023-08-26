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
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user: UserEntity;

  @Column()
  refreshToken: string;

  @Column()
  expiresIn: number;

  @Column()
  createdAt: number;
}
