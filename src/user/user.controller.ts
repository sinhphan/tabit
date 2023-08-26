import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserEntity } from '@/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { TokenGuard } from '@/common/decorator/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { userDump } from '@/constants/dump/user.dump';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(TokenGuard)
  @Get('/users')
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @UseGuards(TokenGuard)
  @Get('/user/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }

  @UseGuards(TokenGuard)
  @Post('/user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(TokenGuard)
  @Delete('/user/:id')
  async removeUser(@Param('id') id: number) {
    return await this.userService.removeUser(id);
  }

  @UseGuards(TokenGuard)
  @Put('/user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Post('/generate')
  async generate() {
    for await (const user of userDump) {
      await this.userService.createUser(user);
    }
    return {
      success: true,
    };
  }
}
