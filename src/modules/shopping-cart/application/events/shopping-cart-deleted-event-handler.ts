import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ShoppingCartDeletedEvent } from "../../domain/events/shopping-cart-deleted-event";

@EventsHandler(ShoppingCartDeletedEvent)
export class ShoppingCartDeletedEventHandler implements IEventHandler<ShoppingCartDeletedEvent> {
  handle(event: ShoppingCartDeletedEvent) {
    // await this.repository.create(event.cartId, event.items);
    const { cartId } = event;
    console.log(`Shopping cart ${cartId} created with id = ${cartId}`);
    console.log("Processing event ShoppingCartDeletedEvent");
  }
}