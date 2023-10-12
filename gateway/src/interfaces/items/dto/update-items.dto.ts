import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto {
  @ApiProperty({ required: false, example: 'test items' })
  name: string;
  @ApiProperty({ required: false, example: 'test items description' })
  description: string;
}
