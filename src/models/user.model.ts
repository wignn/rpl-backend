import { ROLE } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequest {
  @ApiProperty({
    example: 'wign',
    required: false,
  })
  username: string;

  @ApiProperty({
    example: 'wign',
    required: true,
  })
  email: string;
  
  @ApiProperty({
    example: 'password',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 'password',
    required: true,
  })
  confirmPassword: string;

  @ApiProperty({
    example: 'ADMIN',
    enum: ROLE,
    required: false,
  })
  role: ROLE;
}

export class RegisterUserResponse {
  @ApiProperty({
    example: 'pqiwoqkmwknq',
    required: true,
  })
  id_user: string;
  
  @ApiProperty({
    example: 'wign',
    required: false,
  })
  username: string;

  @ApiProperty({
    example: 'wign',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'ADMIN',
    enum: ROLE,
    required: false,
  })
  role: ROLE;
}

export class FindOneResponse {
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
  email: string;

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
  createdAt: Date;

  @ApiProperty({
    example: '2021-08-02T14:00:00.000Z',
    required: false,
  })
  updatedAt: Date;
}



export class LoginUserRequest {
  @ApiProperty({
    example: 'wign',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'password',
    required: true,
  })
  password: string;
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
  backendTokens: {
    accessToken: string;
    refreshToken: string;
  };
}