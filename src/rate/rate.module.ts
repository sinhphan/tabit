import { RateEntity } from '@/entities/rate.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateService } from './services/rate.service';
import { RateController } from './rate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RateEntity])],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
