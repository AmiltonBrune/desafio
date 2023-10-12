import { IItem } from './items.interface';

export interface IServiceItemSearchByUserIdResponse {
  status: number;
  message: string;
  items: IItem[];
}
