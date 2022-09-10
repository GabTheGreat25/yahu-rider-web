export interface IRole<T> {
  _id: string;
  name: string;
  permissions: T[];
  deleted: boolean;
}
