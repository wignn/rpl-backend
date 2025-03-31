import { ApiProperty } from "@nestjs/swagger";

export class FasilityCreateRequest {
    @ApiProperty({
        example: 'sdanknm3wmnkns',
        required: true,
    })
    facility_name: string;


    @ApiProperty({
        example: 'This is a description',
        required: true,
    })
    desc: string;

}
export class FasilityCreateResponse extends FasilityCreateRequest {
    @ApiProperty({
        example: 'sdanknm3wmnkns',
        required: true,
    })
    id_fasility: string;


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
export class FasilityDetails extends FasilityCreateResponse {


}