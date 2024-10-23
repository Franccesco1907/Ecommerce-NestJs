type Item = {
  readonly productId: string;
  readonly quantity: number;
  readonly price: number;
}

type Items = Item[];

export class ShoppingCartCreatedEvent {
  readonly cartId: string;
  readonly items: Items;

  constructor(cartId: string, items: Items) {
    this.cartId = cartId;
    this.items = items;
  }
}