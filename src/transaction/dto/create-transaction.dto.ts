import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsDefined, IsNumber, IsPositive, MaxLength} from "class-validator";

export class CreateTransactionDto {

    @IsDefined()
    @IsNumber()
    @ApiProperty()
    product_id: number;

}
