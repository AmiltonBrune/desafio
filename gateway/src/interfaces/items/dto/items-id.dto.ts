import { ApiProperty } from '@nestjs/swagger';

export class ItemIdDto {
  @ApiProperty()
  id: string;
}
