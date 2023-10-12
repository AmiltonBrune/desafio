import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ example: 'test items' })
  name: string;
  @ApiProperty({ example: 'test items description' })
  description: string;
}
