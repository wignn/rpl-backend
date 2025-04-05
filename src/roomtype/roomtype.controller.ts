import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { DeleteResponse } from 'src/models/common.model';
import { RoomResponse, RoomTypeCreateRequest, RoomTypeResponse } from 'src/models/room.model';
import { RoomtypeService } from './roomtype.service';

@Controller('api/roomtype')
export class RoomtypeController {
    constructor(
        private readonly roomtypeService: RoomtypeService,
     ) { }


  //roomtype
  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'RoomType successfully found',
    type: RoomResponse,
  })
  async findAllRoomTypes(): Promise<RoomTypeResponse[]> {
    return this.roomtypeService.findAllRoomType();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'RoomType successfully found',
    type: RoomResponse,
  })
  async findOneRoomType(@Param('id') id: string): Promise<RoomTypeResponse> {
    return this.roomtypeService.findOneRoomType(id);
  }

  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'RoomType created successfully',
    type: RoomTypeResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async createRoomType(
    @Body() request: RoomTypeCreateRequest,
  ): Promise<RoomTypeResponse> {
    return this.roomtypeService.createRoomType(request);
  }

  @Delete(':id')    
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'RoomType successfully deleted',
    type: DeleteResponse,
  })
  async deleteRoomType(@Param('id') id: string): Promise<DeleteResponse> {
    return this.roomtypeService.deleteRoomType(id);
  }
}
