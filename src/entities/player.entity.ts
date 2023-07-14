import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('players')
export class PlayerEntity {
  @PrimaryGeneratedColumn('increment', {})
  id?: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  username?: string;

  @Column({
    nullable: false,
    default: 0,
  })
  score?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: string;
}
