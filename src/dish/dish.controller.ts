import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/common/decorator/auth.decorator';
import { DishService } from './service/dish.service';
import { DishFindDto } from './dto/DishFind.dto';
import { DishCreateDto, DishUpdateDto } from './dto/dish.dto';
import { dishDump } from '@/constants/dump/dish.dump';

@ApiBearerAuth()
@Controller('/dish')
@ApiTags('Dish')
export class DishController {
  constructor(private service: DishService) {}

  @Get('find')
  async find(@Query() payload: DishFindDto) {
    console.log(
      '🚀 ~ file: dish.controller.ts:34 ~ DishController ~ find ~ payload:',
      payload,
    );
    return await this.service.getDish(payload);
  }

  @Get('/:id')
  @UseGuards(TokenGuard)
  async findByID(@Param('id') id: number) {
    return await this.service.getById(id);
  }

  @Post()
  @UseGuards(TokenGuard)
  async create(@Body() payload: DishCreateDto) {
    return await this.service.create(payload);
  }

  @Patch()
  @UseGuards(TokenGuard)
  async update(@Body() payload: DishUpdateDto) {
    return await this.service.update(payload);
  }

  @Delete('/:id')
  @UseGuards(TokenGuard)
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }

  @Get('restore/:id')
  @UseGuards(TokenGuard)
  async restore(@Param('id') id: number) {
    return await this.service.restore(id);
  }

  @Post('generate')
  @UseGuards(TokenGuard)
  async generate() {
    for await (const dish of dishDump) {
      await this.service.create(dish);
    }
    return { success: true };
  }
}
