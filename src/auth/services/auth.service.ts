import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignOptions } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RefreshSessionEntity } from '@/entities/refreshSession.entity';
import { UserService } from '@/user/services/user.service';
import { UserEntity } from '@/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CBadRequestException } from '@/common/exception/bad-request.exception';
import { ErrorCode } from '@/constants/error';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshSessionEntity)
    private sessionRepository: Repository<RefreshSessionEntity>,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser({ username, password }: UserLoginDto): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(payload: UserLoginDto) {
    const user = await this.validateUser(payload);
    if (!user) {
      throw new CBadRequestException(ErrorCode.PASSWORD_NOT_MATCH);
    }
    try {
      const accessToken = await this.generateAccessToken({
        id: user.id,
        username: user.username,
      });
      const refreshToken = await this.generateRefreshToken({ id: user.id });

      await this.createRefreshSession(user.id, refreshToken);

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new CBadRequestException(ErrorCode.LOGIN_FAIL);
    }
  }

  async createRefreshSession(userId: any, token: string) {
    const session = new RefreshSessionEntity();

    const decodeToken: any = this.jwtService.decode(token);

    session.user = userId;
    session.refreshToken = token;
    session.expiresIn = decodeToken.exp;
    session.createdAt = decodeToken.iat;

    return await this.sessionRepository.save(session);
  }

  async generateAccessToken(payload: {
    id: number;
    username: string;
  }): Promise<string> {
    return this.jwtService.signAsync({
      sub: payload.id,
      username: payload.username,
    });
  }

  async generateRefreshToken(payload: { id: number }): Promise<string> {
    return this.jwtService.signAsync({
      sub: payload.id,
    });
  }

  async refreshToken(token: string) {
    try {
      var decodeToken: any = this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException();
    }

    let user: UserEntity = await this.userService.getUserById(decodeToken.sub);

    let session: RefreshSessionEntity = await this.sessionRepository.findOne({
      where: { refreshToken: token },
    });
    if (!session) throw new UnauthorizedException();

    const accessToken = await this.generateAccessToken({
      id: user.id,
      username: user.username,
    });
    const refreshToken = await this.generateRefreshToken({ id: user.id });

    const decodeNewToken: any = this.jwtService.decode(refreshToken);

    session.createdAt = decodeNewToken.iat;
    session.expiresIn = decodeNewToken.exp;
    session.refreshToken = refreshToken;

    await this.sessionRepository.save(session);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
