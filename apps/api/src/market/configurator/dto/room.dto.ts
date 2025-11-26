import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class RoomDto {
  @ApiProperty({ example: 1, description: 'Временный идентификатор комнаты' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'room', description: 'Тип элемента' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'Гостиная', description: 'Название комнаты' })
  @IsString()
  name: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Массив идентификаторов продуктов',
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  products: number[];
}
