import { ApiProperty } from "@nestjs/swagger";
import { ROOMSTATUS } from "@prisma/client";

export class RoomCreateRequest {    
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

export class RoomUpdateRequest {    
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

export class RoomCreateResponse extends RoomResponse {
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

export class RoomDetailResponse extends RoomResponse {
    @ApiProperty({
        example: {
            id_roomtype: 'sdanknm3wmnkns',
            price: 200,
            created_at: '2021-08-22',
            updated_at: '2021-08-22',
        },
        required: true,
    })
    created_at:Date;
    updated_at: Date;
    roomtype: {
        id_roomtype: string;
        price: number;
        created_at: Date;
        updated_at: Date;
    };
}


