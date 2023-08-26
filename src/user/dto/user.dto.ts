import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  password: string;
}
