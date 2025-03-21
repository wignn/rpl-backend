import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequest {
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
    example: 'GUEST',
    enum: Role,
    required: false,
  })
  role: Role;
}



export class RegisterUserResponse {
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
    example: 'password',
    required: true,
  })
  password: string;


  @ApiProperty({
    example: 'GUEST',
    enum: Role,
    required: false,
  })
  role: Role;
}
