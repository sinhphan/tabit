import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CBadRequestException } from 'src/common/exception/bad-request.exception';
import { PlayerService } from './services/player.service';
import {
  PlayerCreateDto,
  PlayerDto,
  PlayerUpdateDto,
  PlayerUsernameDto,
} from './dto/index.dto';
import {
  PlayerAverageRes,
  PlayerDeleteRes,
  PlayerHistoryRes,
  PlayerRes,
  PlayerWithPaginationRes,
} from './res/index.res';

@ApiBearerAuth()
@ApiTags('Player')
@Controller('/players')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get('/')
  async fetch(@Query() req: PlayerDto): Promise<PlayerWithPaginationRes> {
    return await this.playerService.fetch(req);
  }

  @Get('/average')
  async fetchAverage(
    @Query() req: PlayerUsernameDto,
  ): Promise<PlayerAverageRes> {
    return await this.playerService.average(req?.username);
  }

  @Get('/top')
  async fetchTop(@Query() req: PlayerUsernameDto): Promise<PlayerRes> {
    return await this.playerService.top(req?.username);
  }

  @Get('/low')
  async fetchLow(@Query() req: PlayerUsernameDto): Promise<PlayerRes> {
    return await this.playerService.low(req?.username);
  }

  @Post('/')
  async create(@Body() payload: PlayerCreateDto): Promise<PlayerRes> {
    return await this.playerService.store(payload);
  }

  @Get('/:id')
  async show(@Param('id') id: number): Promise<PlayerRes> {
    if (!Number(id) || !id) throw new CBadRequestException('id is invalid!');
    return await this.playerService.show(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id?: number): Promise<PlayerDeleteRes> {
    if (!Number(id) || !id) throw new CBadRequestException('id is invalid!');
    return await this.playerService.destroy(id);
  }

  @Get('/history/:username')
  async history(
    @Param('username') username?: string,
  ): Promise<PlayerHistoryRes> {
    if (!username) throw new CBadRequestException('username is invalid!');
    return await this.playerService.history(username);
  }
}
