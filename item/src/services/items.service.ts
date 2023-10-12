import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IItem } from '../interfaces/items.interface';
import { IItemUpdateParams } from '../interfaces/items-update-params.interface';

@Injectable()
export class ItemService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<IItem>) {}

  public async getItemsByUserId(userId: string): Promise<IItem[]> {
    return this.itemModel.find({ user_id: userId }).exec();
  }

  public async createItem(itemBody: IItem): Promise<IItem> {
    const itemModel = new this.itemModel(itemBody);
    return await itemModel.save();
  }

  public async findItemById(id: string) {
    return await this.itemModel.findById(id);
  }

  public async removeItemById(id: string) {
    return await this.itemModel.findOneAndDelete({ _id: id });
  }

  public async updateItemById(
    id: string,
    params: IItemUpdateParams,
  ): Promise<any> {
    return await this.itemModel.updateOne({ _id: id }, params);
  }
}
