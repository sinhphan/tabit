import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('dish')
export class DishEntity {
  @PrimaryGeneratedColumn('increment', {})
  id?: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name?: string;

  @Column({
    nullable: false,
    default: 0,
  })
  description?: string;

  @Column({
    nullable: true,
    default: 0,
  })
  image?: string;

  @Column({
    nullable: false,
    default: 0,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: string;
}
