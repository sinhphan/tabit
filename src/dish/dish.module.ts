import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishController } from './dish.controller';
import { DishService } from './service/dish.service';
import { DishEntity } from '@/entities/dish.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DishEntity])],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
