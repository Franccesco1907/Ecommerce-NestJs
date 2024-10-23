import { ClientException } from 'src/core/exceptions/client.exception';
import { validate } from 'uuid';

export class CartIdVO {
  private readonly _value: string;

  constructor(value: string) {
    if (value.trim() === '') {
      throw new ClientException('CartId is required');
    }

    if (!validate(value)) {
      throw new ClientException('Invalid cartId');
    }

    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}