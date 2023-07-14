import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels()
export class PlayerDto {
  @ApiProperty({
    required: false,
  })
  id?: number;

  @ApiProperty({
    required: true,
  })
  username?: string;

  @ApiProperty({
    required: false,
    default: 1,
  })
  page?: number;

  @ApiProperty({
    required: false,
    default: 10,
  })
  limit?: number;

  @ApiProperty({
    required: false,
    default: false,
  })
  isDesc?: boolean;

  @ApiProperty({
    required: false,
  })
  startAt?: string;

  @ApiProperty({
    required: false,
  })
  endAt?: string;
}

@ApiExtraModels()
export class PlayerUsernameDto {
  @ApiProperty({
    required: true,
  })
  username?: string;
}

@ApiExtraModels()
export class PlayerCreateDto {
  @ApiProperty({
    required: true,
  })
  username?: string;

  @ApiProperty({
    required: true,
  })
  score?: number;
}

@ApiExtraModels()
export class PlayerUpdateDto {
  @ApiProperty({
    required: true,
  })
  username?: string;

  @ApiProperty({
    required: true,
  })
  score?: number;
}
