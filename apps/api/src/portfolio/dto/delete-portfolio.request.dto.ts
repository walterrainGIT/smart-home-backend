import {IDeletePortfolio} from "@smart-home/libs/types/portfolio";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsNumber, IsOptional} from "class-validator";

export class DeletePortfolioRequestDto implements IDeletePortfolio {
    @ApiProperty({
        name: 'id',
        type: Number,
        required: true,
        description: 'id',
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    id: number;
}
