import { ApiProperty } from '@nestjs/swagger';

export class RateCreateDto {
  @ApiProperty({ required: true })
  userId: number;

  @ApiProperty({ required: true })
  dishId: number;

  @ApiProperty({ required: true })
  rate: number;

  @ApiProperty()
  comment: string;
}
