import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { RoomService } from './room.service';
import {
  CreateRoomRequest,
  CreateRoomResponse,
  GetResponse,
} from 'src/models/room.model';
import { ApiResponse } from '@nestjs/swagger';

@Controller('room')
export class RoomController {
  constructor(private roomservice: RoomService) {}

  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Room created successfully',
    type: CreateRoomResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 404,
    description: 'RoomType not exist',
  })
  async createRoom(
    @Body() request: CreateRoomRequest,
  ): Promise<CreateRoomResponse> {
    return this.roomservice.create(request);
  }

  @ApiResponse({
    status: 200,
    description: 'Room successfully found',
    type: GetResponse,
  })
  @Get()
  @HttpCode(200)
  async findAll(): Promise<GetResponse[]> {
    return this.roomservice.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Room successfully found',
    type: GetResponse,
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<GetResponse> {
    return this.roomservice.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Room successfully deleted',
    type: "room created successfully",
  })
  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<string> {
    return this.roomservice.delete(id);
  }
}
