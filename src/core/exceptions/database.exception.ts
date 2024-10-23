import { HttpStatus } from "@nestjs/common";
import { BaseException, NameExceptions } from "./base.exception";

export class DatabaseException extends BaseException {
  constructor(message?: string) {
    super(message);
    this.name = NameExceptions.DATABASE_EXCEPTION;
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}