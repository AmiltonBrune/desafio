import { ApiProperty } from '@nestjs/swagger';
import { IItem } from '../items.interface';

export class UpdateItemResponseDto {
  @ApiProperty({ example: 'item_update_by_id_success' })
  message: string;
  @ApiProperty({
    example: {
      items: {
        name: 'test items',
        description: 'test items description',
        user_id: '5d987c3bfb881ec86b476bca',
        created_at: +new Date(),
        updated_at: +new Date(),
        id: '5d987c3bfb881ec86b476bcc',
      },
    },
    nullable: true,
  })
  data: {
    items: IItem;
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
