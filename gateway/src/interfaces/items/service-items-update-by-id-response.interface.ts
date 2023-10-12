import { IItem } from './items.interface';

export interface IServiceItemUpdateByIdResponse {
  status: number;
  message: string;
  items: IItem | null;
  errors: { [key: string]: any };
}
