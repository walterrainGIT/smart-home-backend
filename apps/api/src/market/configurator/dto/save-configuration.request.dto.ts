import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { RoomDto } from "./room.dto";

export class SaveConfigurationRequestDto {
  @ApiProperty({ 
    type: [RoomDto], 
    description: "Массив комнат с размещенными продуктами",
    example: [
      {
        id: 1,
        type: "room",
        name: "Гостиная",
        products: [1, 2, 3]
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomDto)
  rooms: RoomDto[];

  @ApiProperty({ 
    required: false, 
    example: "Мой умный дом",
    description: "Название конфигурации"
  })
  @IsOptional()
  @IsString()
  name?: string;
}

