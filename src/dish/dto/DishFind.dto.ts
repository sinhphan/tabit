import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class DishFindDto {
  @ApiProperty({
    required: false,
  })
  page?: number;

  @ApiProperty({
    required: false,
  })
  searchField?: string;

  @ApiProperty({
    required: false,
  })
  searchKey?: string;

  @ApiProperty({
    required: false,
  })
  condition?: 'in' | 'lt' | 'mt';

  @ApiProperty({
    required: false,
  })
  order?: string;

  @ApiProperty({
    required: false,
  })
  limit?: number;
}
