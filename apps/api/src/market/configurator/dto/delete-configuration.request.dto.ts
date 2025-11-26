import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class DeleteConfigurationRequestDto {
  @ApiProperty({ 
    example: 1, 
    description: "Идентификатор конфигурации для удаления"
  })
  @Type(() => Number)
  @IsNumber()
  id: number;
}

