import { Module } from '@nestjs/common';
import configuration from './common/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityModule } from './entities';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DishModule } from './dish/dish.module';
import { RateModule } from './rate/rate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configuration,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (c: ConfigService) => {
        const configDatabase = c.get<TypeOrmModuleOptions>('database');
        return configDatabase;
      },
    }),
    EntityModule,
    UserModule,
    AuthModule,
    DishModule,
    RateModule,
  ],
})
export class AppModule {}
