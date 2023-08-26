import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('rate')
export class RateEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  userId?: number;

  @Column()
  dishId?: number;

  @Column()
  comment?: string;

  @Column()
  rate?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;
}
