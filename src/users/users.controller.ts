import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  FindOneResponse,
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from 'src/models/user.model';
import { ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User successfully created',
    type: RegisterUserResponse,
  })
  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 409,
    description: 'User already exists',
  })
  @ApiResponse({
    status: 422,
    description: 'Passwords do not match',
  })
  @ApiResponse({
    status: 400,
    description: 'validation error',
  })
  create(
    @Body() createUserDto: RegisterUserRequest,
  ): Promise<RegisterUserResponse> {
    return this.usersService.create(createUserDto);
  }

  @Patch()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: LoginUserResponse,
  })
  login(@Body() loginUserDto: LoginUserRequest): Promise<any> {
    return this.usersService.signIn(loginUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'User successfully found',
    type: FindOneResponse,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'User successfully found',
    type: FindOneResponse,
  })
  findOne(@Param('id') id: string): Promise<FindOneResponse> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
