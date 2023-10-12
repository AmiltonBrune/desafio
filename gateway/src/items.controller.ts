import {
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiSecurity,
} from '@nestjs/swagger';

import { Authorization } from './decorators/authorization.decorator';
import { Permission } from './decorators/permission.decorator';

import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { IServiceItemCreateResponse } from './interfaces/items/service-items-create-response.interface';
import { IServiceItemDeleteResponse } from './interfaces/items/service-items-delete-response.interface';
import { IServiceItemSearchByUserIdResponse } from './interfaces/items/service-items-search-by-user-id-response.interface';
import { IServiceItemUpdateByIdResponse } from './interfaces/items/service-items-update-by-id-response.interface';
import { GetItemsResponseDto } from './interfaces/items/dto/get-items-response.dto';
import { CreateItemResponseDto } from './interfaces/items/dto/create-items-response.dto';
import { DeleteItemResponseDto } from './interfaces/items/dto/delete-items-response.dto';
import { UpdateItemResponseDto } from './interfaces/items/dto/update-items-response.dto';
import { CreateItemDto } from './interfaces/items/dto/create-items.dto';
import { UpdateItemDto } from './interfaces/items/dto/update-items.dto';
import { ItemIdDto } from './interfaces/items/dto/items-id.dto';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(
    @Inject('ITEMS_SERVICE') private readonly itemServiceClient: ClientProxy,
  ) {}

  @Get()
  @Authorization(true)
  @Permission('item_search_by_user_id')
  @ApiOkResponse({
    type: GetItemsResponseDto,
    description: 'List of items for signed in user',
  })
  @ApiSecurity('authorization')
  public async getItems(
    @Req() request: IAuthorizedRequest,
  ): Promise<GetItemsResponseDto> {
    const userInfo = request.user;

    const itemsResponse: IServiceItemSearchByUserIdResponse =
      await firstValueFrom(
        this.itemServiceClient.send('item_search_by_user_id', userInfo.id),
      );

    return {
      message: itemsResponse.message,
      data: {
        items: itemsResponse.items,
      },
      errors: null,
    };
  }

  @Post()
  @Authorization(true)
  @Permission('item_create')
  @ApiCreatedResponse({
    type: CreateItemResponseDto,
  })
  @ApiSecurity('authorization')
  public async createItem(
    @Req() request: IAuthorizedRequest,
    @Body() itemRequest: CreateItemDto,
  ): Promise<CreateItemResponseDto> {
    const userInfo = request.user;
    const createItemResponse: IServiceItemCreateResponse = await firstValueFrom(
      this.itemServiceClient.send(
        'item_create',
        Object.assign(itemRequest, { user_id: userInfo.id }),
      ),
    );

    if (createItemResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createItemResponse.message,
          data: null,
          errors: createItemResponse.errors,
        },
        createItemResponse.status,
      );
    }

    return {
      message: createItemResponse.message,
      data: {
        items: createItemResponse.items,
      },
      errors: null,
    };
  }

  @Delete(':id')
  @Authorization(true)
  @Permission('item_delete_by_id')
  @ApiOkResponse({
    type: DeleteItemResponseDto,
  })
  @ApiSecurity('authorization')
  public async deleteItem(
    @Req() request: IAuthorizedRequest,
    @Param() params: ItemIdDto,
  ): Promise<DeleteItemResponseDto> {
    const userInfo = request.user;

    const deleteItemResponse: IServiceItemDeleteResponse = await firstValueFrom(
      this.itemServiceClient.send('item_delete_by_id', {
        id: params.id,
        userId: userInfo.id,
      }),
    );

    if (deleteItemResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: deleteItemResponse.message,
          errors: deleteItemResponse.errors,
          data: null,
        },
        deleteItemResponse.status,
      );
    }

    return {
      message: deleteItemResponse.message,
      data: null,
      errors: null,
    };
  }

  @Put(':id')
  @Authorization(true)
  @Permission('item_update_by_id')
  @ApiOkResponse({
    type: UpdateItemResponseDto,
  })
  @ApiSecurity('authorization')
  public async updateItem(
    @Req() request: IAuthorizedRequest,
    @Param() params: ItemIdDto,
    @Body() itemRequest: UpdateItemDto,
  ): Promise<UpdateItemResponseDto> {
    const userInfo = request.user;
    const updateItemResponse: IServiceItemUpdateByIdResponse =
      await firstValueFrom(
        this.itemServiceClient.send('item_update_by_id', {
          id: params.id,
          userId: userInfo.id,
          items: itemRequest,
        }),
      );

    if (updateItemResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: updateItemResponse.message,
          errors: updateItemResponse.errors,
          data: null,
        },
        updateItemResponse.status,
      );
    }

    return {
      message: updateItemResponse.message,
      data: {
        items: updateItemResponse.items,
      },
      errors: null,
    };
  }
}
