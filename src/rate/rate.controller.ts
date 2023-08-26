import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/common/decorator/auth.decorator';
import { RateService } from './services/rate.service';
import { RateCreateDto } from './dto/rate.dto';

@ApiBearerAuth()
@Controller('/rate')
@ApiTags('Rate')
export class RateController {
  constructor(private service: RateService) {}
  @Post()
  @UseGuards(TokenGuard)
  async create(@Body() rate: RateCreateDto) {
    return await this.service.create(rate);
  }
}
