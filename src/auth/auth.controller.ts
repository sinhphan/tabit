import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RefreshDto } from './dto/auth.dto';
import { User } from '@/common/decorator/user.devorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@User() user) {
    return await this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refreshToken(refreshDto.refreshToken);
  }
}
