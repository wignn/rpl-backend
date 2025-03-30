import { ROLE } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({
    example: 'wign',
    required: true,
  })
  phone: string;

  @ApiProperty({
    example: 'password',
    required: true,
  })
  password: string;
}
class backendTokens {
  @ApiProperty({
    example: 'backendTokens with access tokens',
    required: true,
  })
  accessToken: string;

  @ApiProperty({
    example: 'backendTokens with refresh tokens',
    required: true,
  })
  refreshToken: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: 'pqiwoqkmwknq',
    required: true,
  })
  id: string;

  @ApiProperty({
    example: 'wign',
    required: true,
  })
  username: string;

  @ApiProperty({
    example: 'ADMIN',
    required: true,
  })
  role: ROLE;

  @ApiProperty({
    example: 'backendTokens with access and refresh tokens',
    required: false,
  })
  backendTokens: backendTokens;
}

export class userResponse {
  @ApiProperty({
    example: 'wign',
    required: false,
  })
  id: string;

  @ApiProperty({
    example: 'wign',
    required: false,
  })
  name: string;

  @ApiProperty({
    example: 'wign',
    required: true,
  })
  phone: string;

  @ApiProperty({
    example: 'GUEST',
    enum: ROLE,
    required: false,
  })
  role: ROLE;

  @ApiProperty({
    example: '2021-08-02T14:00:00.000Z',
    required: true,
  })
  created_at: Date;

  @ApiProperty({
    example: '2021-08-02T14:00:00.000Z',
    required: false,
  })
  updated_at: Date;
}
