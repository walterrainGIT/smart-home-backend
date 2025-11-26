import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsArray, IsDateString } from "class-validator";
import { RoomDto } from "./room.dto";

export class SaveConfigurationResponseDto {
  @ApiProperty({ example: 1, description: "Идентификатор конфигурации" })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 3, description: "Идентификатор пользователя" })
  @IsNumber()
  userId: number;

  @ApiProperty({ 
    type: [RoomDto], 
    description: "Массив комнат с размещенными продуктами"
  })
  @IsArray()
  rooms: RoomDto[];

  @ApiProperty({ example: 150000, description: "Общая стоимость конфигурации" })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ 
    required: false, 
    example: "Мой умный дом",
    description: "Название конфигурации"
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ 
    example: "2024-01-15T10:30:00.000Z",
    description: "Дата создания конфигурации"
  })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ 
    example: "2024-01-15T10:30:00.000Z",
    description: "Дата обновления конфигурации"
  })
  @IsDateString()
  updatedAt: string;
}

