import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DishEntity } from './dish.entity';
import { RefreshSessionEntity } from './refreshSession.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, DishEntity, RefreshSessionEntity]),
  ],
  controllers: [],
  providers: [],
})
export class EntityModule {}
