import { ApiProperty } from "@nestjs/swagger";
import { ROLE, STATUS } from "@prisma/client";




export class CreateTenantRequest {

    @ApiProperty({
        example: '2311400000000004',
        description: 'Name of the tenant',
        required: true,
    })
    no_ktp: string;

    @ApiProperty({
        example: 'M. Iqbal',
        description: 'Name of the tenant',
        required: true,
    })
    full_name: string;

    @ApiProperty({
        example: 'Jl. Kaliurang No. 10',
        description: 'Address of the tenant',
        required: true,
    })
    address: string;

    @ApiProperty({
        example: 'MARRIED',
        description: 'Type of tenant',
        required: true,
    })
    status: STATUS;

    @ApiProperty({
        example: '2021-08-22',
        description: 'Date when the tenant moved in',
        required: true,
    })
    rent_in: string;

    @ApiProperty({
        example: '2021-08-22',
        description: 'Date when the tenant moved in',
        required: true,
    })
    no_telp : string;

    @ApiProperty({
        example: '2021-08-22',
        description: 'Date when the tenant moved in',
        required: true,
    })
    id_room : string;
}
class UserResponse {
    @ApiProperty({ example: 1 })
    id_user: string;

    @ApiProperty({ example: "M. Iqbal" })
    username: string;

    @ApiProperty({ example: "TENANT" })
    role: string;
}

class TenantResponse {
    @ApiProperty({ example: 1 })
    id_tenant: string;

    @ApiProperty({ example: "Jl. Kaliurang No. 10" })
    address: string;

    @ApiProperty({ example: "2311400000000004" })
    no_ktp: string;

    @ApiProperty({ example: "MARRIED" })
    status: STATUS;

    @ApiProperty({ example: "08123456789" })
    no_telp: string;

    @ApiProperty({ example: "M. Iqbal" })
    full_name: string;
}

class RoomDataResponse {
    @ApiProperty({ example: 1 })
    id_rent: string;

    @ApiProperty({ example: 1 })
    id_tenant: string | null

    @ApiProperty({ example: "R001" })
    id_room: string;

    @ApiProperty({ example: "2021-08-22" })
    rent_date: Date;
}

export class CreateTenantResponse {
    @ApiProperty({ type: UserResponse })
    user: UserResponse;

    @ApiProperty({ type: TenantResponse })
    tenant: TenantResponse;

    @ApiProperty({ type: RoomDataResponse })
    roomData: RoomDataResponse;
}