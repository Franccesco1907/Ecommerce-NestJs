export class ShoppingCartDeletedEvent {
  readonly cartId: string;

  constructor(cartId: string) {
    this.cartId = cartId;
  }
}