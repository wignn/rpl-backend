import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(
        private roomservice: RoomService
    ){}


    @Post()
    @HttpCode(200)
    async createRoom(
        @Body() request
    ): Promise<any> {

    }
}
