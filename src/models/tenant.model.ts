import { ApiProperty } from "@nestjs/swagger";
import { STATUS } from "@prisma/client";




export class CreateTenantRequest {

    @ApiProperty({
        example: '2311400000000004',
        description: 'Name of the tenant',
        required: true,
    })
    no_ktp: string;

    @ApiProperty({
        example: '/path/to/ktp_image',
        description: 'Path to the image of the tenant\'s KTP',
        required: true,
    })
    ktp_image: string;

    @ApiProperty({
        example: 'Jl. Kaliurang No. 10',
        description: 'Address of the tenant',
        required: true,
    })
    addres: string;

    @ApiProperty({
        example: 'MERRIED',
        description: 'Type of tenant',
        required: true,
    })
    status: STATUS;


    @ApiProperty({
        example: '2021-08-22',
        description: 'Date when the tenant moved in',
        required: true,
    })
    no_telp : string;
}

export class CreateTenantResponse {
    @ApiProperty({
        example: 'pqiwoqkmwknq',
        description: 'ID of the tenant',
        required: true,
    })
    id_tenant: string;

    @ApiProperty({
        example: 'Jl. Kaliurang No. 10',
        description: 'Address of the tenant',
        required: true,
    })
    addres: string;

    @ApiProperty({
        example: 'MERRIED',
        description: 'Type of tenant',
        required: true,
    })
    status: STATUS;

    @ApiProperty({
        example: '2021-08-22',
        description: 'Date when the tenant moved in',
        required: true,
    })
    no_telp : string;
}