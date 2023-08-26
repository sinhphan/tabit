import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import appConfig from '../config/app.config';

export interface RefreshJwt extends JwtPayload {
  id: number;
  sub: string;
  type?: string;
}

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);

    let authorization = request.headers?.authorization;
    if (!authorization || authorization === '') {
      if (!request?.query?.token || request?.query?.token === '') {
        throw new UnauthorizedException();
      }
      authorization = `Bearer ${request?.query?.token}`;
    }
    const tokens = authorization.split(' ');
    if (!tokens || tokens.length !== 2) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(tokens[1], {
        secret: appConfig().jwt_constants,
      });
      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }

  getRequest<T = any>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }
}
