import { ApiProperty } from "@nestjs/swagger";
import { ROOMSTATUS } from "@prisma/client";

export class CreateRoomRequest {    
    @ApiProperty({
        example: 'sdanknm3wmnkns',
        required: true,
    })
    id_roomtype: string;
    
    @ApiProperty({
        example: 'Available',
        required: true,
    })
    status: ROOMSTATUS;
}

export class UpdateRoomRequest {    
    @ApiProperty({
        example: 'sdanknm3wmnkns',
        required: true,
    })
    id_roomtype?: string;
    
    @ApiProperty({
        example: 'Available',
        required: true,
    })
    status?: ROOMSTATUS;
}


export class CreateRoomResponse {
    @ApiProperty({
        example: 'sdanknm3wmnkns',
        required: true,
    })
    id_room: string;
    
    @ApiProperty({
        example: 'sdanknm3wmnkns',
        required: true,
    })
    id_roomtype: string;
    
    @ApiProperty({
        example: 'Available',
        required: true,
    })
    status: ROOMSTATUS;

    @ApiProperty({
        example: '2021-08-22',
        required: true,
    })
    created_at: Date;

    @ApiProperty({
        example: '2021-08-22',
        required: true,
    })
    updated_at: Date;
}


export class GetResponse extends CreateRoomResponse{
    roomtype:{
        id_roomtype: string;
        price: number;
        created_at: Date;
        updated_at: Date;
    }
}


export class RoomResponse {
    @ApiProperty({
        example: 'sdanknm3wmnkns',
        required: true,
    })
    id_room: string;
    
    @ApiProperty({
        example: 'sdanknm3wmnkns',
        required: true,
    })
    id_roomtype: string;
    
    @ApiProperty({
        example: 'Available',
        required: true,
    })
    status: ROOMSTATUS;
}

