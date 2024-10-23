export type ResultPage<T> = {
  page: number;
  pageSize: number;
  total: number;
  items: T[];
}