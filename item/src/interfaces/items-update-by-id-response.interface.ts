import { IItem } from './items.interface';

export interface IItemUpdateByIdResponse {
  status: number;
  message: string;
  items: IItem | null;
  errors: { [key: string]: any } | null;
}
