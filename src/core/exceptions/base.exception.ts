
export enum NameExceptions {
  DATABASE_EXCEPTION = 'DatabaseException',
  CLIENT_EXCEPTION = 'ClientException',
}


export class BaseException extends Error {
  status: number;

  constructor(message: string) {
    super(message);
  }
}