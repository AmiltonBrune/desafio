import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ItemService } from './services/items.service';
import { IItem } from './interfaces/items.interface';
import { IItemUpdateParams } from './interfaces/items-update-params.interface';
import { IItemSearchByUserResponse } from './interfaces/items-search-by-user-response.interface';
import { IItemDeleteResponse } from './interfaces/items-delete-response.interface';
import { IItemCreateResponse } from './interfaces/items-create-response.interface';
import { IItemUpdateByIdResponse } from './interfaces/items-update-by-id-response.interface';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @MessagePattern('item_search_by_user_id')
  public async itemSearchByUserId(
    userId: string,
  ): Promise<IItemSearchByUserResponse> {
    let result: IItemSearchByUserResponse;

    if (userId) {
      const items = await this.itemService.getItemsByUserId(userId);
      result = {
        status: HttpStatus.OK,
        message: 'item_search_by_user_id_success',
        items,
      };
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'item_search_by_user_id_bad_request',
        items: null,
      };
    }

    return result;
  }

  @MessagePattern('item_update_by_id')
  public async itemUpdateById(params: {
    items: IItemUpdateParams;
    id: string;
    userId: string;
  }): Promise<IItemUpdateByIdResponse> {
    let result: IItemUpdateByIdResponse;
    if (params.id) {
      try {
        const items = await this.itemService.findItemById(params.id);
        if (items) {
          if (items.user_id === params.userId) {
            const updatedItem = Object.assign(items, params.items);
            await updatedItem.save();
            result = {
              status: HttpStatus.OK,
              message: 'item_update_by_id_success',
              items: updatedItem,
              errors: null,
            };
          } else {
            result = {
              status: HttpStatus.FORBIDDEN,
              message: 'item_update_by_id_forbidden',
              items: null,
              errors: null,
            };
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'item_update_by_id_not_found',
            items: null,
            errors: null,
          };
        }
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'item_update_by_id_precondition_failed',
          items: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'item_update_by_id_bad_request',
        items: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('item_create')
  public async itemCreate(itemBody: IItem): Promise<IItemCreateResponse> {
    let result: IItemCreateResponse;

    if (itemBody) {
      try {
        const items = await this.itemService.createItem(itemBody);
        result = {
          status: HttpStatus.CREATED,
          message: 'item_create_success',
          items,
          errors: null,
        };
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'item_create_precondition_failed',
          items: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'item_create_bad_request',
        items: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('item_delete_by_id')
  public async itemDeleteForUser(params: {
    userId: string;
    id: string;
  }): Promise<IItemDeleteResponse> {
    let result: IItemDeleteResponse;

    if (params && params.userId && params.id) {
      try {
        const items = await this.itemService.findItemById(params.id);

        if (items) {
          if (items.user_id === params.userId) {
            await this.itemService.removeItemById(params.id);
            result = {
              status: HttpStatus.OK,
              message: 'item_delete_by_id_success',
              errors: null,
            };
          } else {
            result = {
              status: HttpStatus.FORBIDDEN,
              message: 'item_delete_by_id_forbidden',
              errors: null,
            };
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'item_delete_by_id_not_found',
            errors: null,
          };
        }
      } catch (e) {
        result = {
          status: HttpStatus.FORBIDDEN,
          message: 'item_delete_by_id_forbidden',
          errors: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'item_delete_by_id_bad_request',
        errors: null,
      };
    }

    return result;
  }
}
