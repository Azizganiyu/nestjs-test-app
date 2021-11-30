import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsDefined, IsNumber, IsPositive, MaxLength} from "class-validator";

export class CreateProductDto {

    
    @IsDefined()
    @IsAlphanumeric()
    @ApiProperty()
    @MaxLength(199)
    name: string;

    @IsDefined()
    @ApiProperty()
    @MaxLength(300)
    description: string;

    @IsDefined()
    @IsPositive()
    @IsNumber()
    @ApiProperty()
    price: number;

    @IsDefined()
    @IsPositive()
    @IsNumber()
    @ApiProperty()
    quantity: number;

    @ApiProperty({required: false})
    status?: number;

    @ApiProperty({required: false})
    image?: string
}
