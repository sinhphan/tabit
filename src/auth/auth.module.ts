import { RefreshSessionEntity } from '@/entities/refreshSession.entity';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
    }),
    TypeOrmModule.forFeature([RefreshSessionEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
