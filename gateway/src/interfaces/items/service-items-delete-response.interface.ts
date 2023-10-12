export interface IServiceItemDeleteResponse {
  status: number;
  message: string;
  errors: { [key: string]: any };
}
