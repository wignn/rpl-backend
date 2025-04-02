import { ApiProperty } from "@nestjs/swagger";
import { INOUT } from "@prisma/client";


export class FinanceCreateRequest {
    @ApiProperty({
        description: "id of the tenant",
        example: "1234567890",
    })
    id_tenant?: string;
    @ApiProperty({
        description: "id of the rent",
        example: "1234567890",
    })
    id_rent?: string;
    
    @ApiProperty({
        description: "type of the finance",
        example: "INCOME",
    })
    type: INOUT;
    
    @ApiProperty({
        description: "category of the finance",
        example: "Rent",
    })
    category: string;
    
    @ApiProperty({
        description: "amount of the finance remember to use positive number and in rupiah",
        example: 1000,
    })
    amount: number;
    
    @ApiProperty({
        description: "date of the finance",
        example: "2023-10-01",
    })
    payment_date: Date;
}


export class FinanceResponse extends FinanceCreateRequest {
    @ApiProperty({
        description: "id of the finance",
        example: "some random string",
    })
    id_finance: string;
    
    @ApiProperty({
        description: "created at of the finance",
        example: "2023-10-01T00:00:00.000Z",
    })
    created_at: Date;
    
    @ApiProperty({
        description: "updated at of the finance",
        example: "2023-10-01T00:00:00.000Z",
    })
    updated_at: Date;
}