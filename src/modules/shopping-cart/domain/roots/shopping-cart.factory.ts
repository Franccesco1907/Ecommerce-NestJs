import { Injectable } from "@nestjs/common";
import { ShoppingCartCreatedEvent } from "../events/shopping-cart-created-event";
import { CartIdVO } from "../value-objects/cart-id.vo";
import { ItemsVO } from "../value-objects/items.vo";
import { ShoppingCart, ShoppingCartProps } from "./shopping-cart";
import { EventPublisher } from "@nestjs/cqrs";

@Injectable()
export class ShoppingCartFactory {

  constructor(
    private readonly eventPublisher: EventPublisher,
  ) { }

  create(props: ShoppingCartProps): ShoppingCart {
    const cartIdVO = new CartIdVO(props.cartId);
    const itemsVO = new ItemsVO(props.items);

    const cart = this.eventPublisher.mergeObjectContext(
      new ShoppingCart(props)
    );
    cart.apply(new ShoppingCartCreatedEvent(props.cartId, props.items));

    return cart;
  }
}