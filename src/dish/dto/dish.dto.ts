import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ApiExtraModels()
export class DishCreateDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    required: false,
  })
  image?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price?: number;
}

@ApiExtraModels()
export class DishUpdateDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  id?: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    required: false,
  })
  image?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price?: number;
}
