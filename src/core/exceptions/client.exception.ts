import { HttpStatus } from "@nestjs/common";
import { BaseException, NameExceptions } from "./base.exception";

export class ClientException extends BaseException {
  constructor(message?: string) {
    super(message);
    this.name = NameExceptions.CLIENT_EXCEPTION;
    this.status = HttpStatus.BAD_REQUEST;
  }
}