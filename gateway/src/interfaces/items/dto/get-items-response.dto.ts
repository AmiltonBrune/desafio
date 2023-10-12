import { ApiProperty } from '@nestjs/swagger';
import { IItem } from '../items.interface';

export class GetItemsResponseDto {
  @ApiProperty({ example: 'item_search_success' })
  message: string;
  @ApiProperty({
    example: {
      items: [
        {
          name: 'test items',
          description: 'test items description',
          user_id: '5d987c3bfb881ec86b476bca',
          created_at: +new Date(),
          updated_at: +new Date(),
          id: '5d987c3bfb881ec86b476bcc',
        },
      ],
    },
    nullable: true,
  })
  data: {
    items: IItem[];
  };
  @ApiProperty({ example: 'null' })
  errors: { [key: string]: any };
}
