import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RefreshDto, UserLoginDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: UserLoginDto) {
    return await this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refreshToken(refreshDto.refreshToken);
  }
}
