import { RefreshSessionEntity } from '@/entities/refreshSession.entity';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '@/user/services/user.service';
import { UserEntity } from '@/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import appConfig from '@/common/config/app.config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: appConfig().jwt_constants,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([RefreshSessionEntity, UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
