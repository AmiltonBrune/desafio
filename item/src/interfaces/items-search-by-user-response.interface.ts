import { IItem } from './items.interface';

export interface IItemSearchByUserResponse {
  status: number;
  message: string;
  items: IItem[];
}
