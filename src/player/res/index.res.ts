import { ApiProperty } from '@nestjs/swagger';

export class PlayerWithPaginationRes {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  players?: PlayerRes[];

  @ApiProperty()
  total?: number;
}

export class PlayerRes {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  score?: number;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  updatedAt?: string;

  @ApiProperty()
  deletedAt?: string;
}

export class PlayerAverageRes {
  @ApiProperty()
  username?: string;

  @ApiProperty()
  average?: string;
}

export class PlayerDeleteRes {
  @ApiProperty()
  message?: string;
}

export class PlayerHistoryRes {
  @ApiProperty()
  top?: number;

  @ApiProperty()
  low?: number;

  @ApiProperty()
  average?: string;

  @ApiProperty()
  scores?: PlayerHistoryScoreRes[];
}

export class PlayerHistoryScoreRes {
  @ApiProperty()
  score?: number;

  @ApiProperty()
  createdAt?: string;
}
