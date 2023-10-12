import { IItem } from './items.interface';

export interface IItemCreateResponse {
  status: number;
  message: string;
  items: IItem | null;
  errors: { [key: string]: any } | null;
}
