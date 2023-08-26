import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    default: 'test',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    required: true,
    default: 'test_pass',
  })
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
