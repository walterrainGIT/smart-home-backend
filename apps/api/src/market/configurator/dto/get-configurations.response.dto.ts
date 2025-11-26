import { ApiProperty } from "@nestjs/swagger";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { SaveConfigurationResponseDto } from "./save-configuration.response.dto";

export class GetConfigurationsResponseDto {
  @ApiProperty({ 
    type: [SaveConfigurationResponseDto], 
    description: "Массив сохраненных конфигураций пользователя"
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveConfigurationResponseDto)
  configurations: SaveConfigurationResponseDto[];
}

