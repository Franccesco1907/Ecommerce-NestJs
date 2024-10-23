import { ClientException } from "src/core/exceptions/client.exception";
import { ShoppingCartItem } from "../entities/shopping-cart-item";

export class ItemsVO {
  private readonly _value: ShoppingCartItem[];

  constructor(items: ShoppingCartItem[]) {
    if (items.length === 0) {
      throw new ClientException('Items are required');
    }

    this._value = items;
  }

  get value() {
    return this._value;
  }
}