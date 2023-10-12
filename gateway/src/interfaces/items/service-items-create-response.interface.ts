import { IItem } from './items.interface';

export interface IServiceItemCreateResponse {
  status: number;
  message: string;
  items: IItem | null;
  errors: { [key: string]: any };
}
