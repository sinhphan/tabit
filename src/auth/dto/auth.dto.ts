import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshDto {
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
}
export class UserLoginDto {
  @ApiProperty({
    default: 'test',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    default: 'test_pass',
  })
  @IsNotEmpty()
  password: string;
}
