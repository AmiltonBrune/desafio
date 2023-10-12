export interface IItemDeleteResponse {
  status: number;
  message: string;
  errors: { [key: string]: any } | null;
}
