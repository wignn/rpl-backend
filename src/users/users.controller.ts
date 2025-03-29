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
  LoginUserRequest,
  LoginUserResponse,
  userResponse,
} from 'src/models/user.model';
import { ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Patch()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: LoginUserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'validation error',
  })
  @ApiResponse({
    status: 404,
    description:"password or username not exist"
  })
  async login(@Body() loginUserDto: LoginUserRequest): Promise<LoginUserResponse> {
    return this.usersService.signIn(loginUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'User successfully found',
    type: userResponse,
  })
  async findAll():Promise<userResponse[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'User successfully found',
    type: userResponse,
  })
  findOne(@Param('id') id: string): Promise<userResponse> {
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
