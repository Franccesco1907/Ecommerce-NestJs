import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ShoppingCartCreatedEvent } from "../../domain/events/shopping-cart-created-event";

@EventsHandler(ShoppingCartCreatedEvent)
export class ShoppingCartCreatedEventHandler implements IEventHandler<ShoppingCartCreatedEvent> {
  // constructor(
  //   @Inject(ShoppingCartInfrastructure)
  //   private readonly repository: ShoppingCartRepository,
  // ) { }

  handle(event: ShoppingCartCreatedEvent) {
    // await this.repository.create(event.cartId, event.items);
    const { cartId, items } = event;
    console.log(`Shopping cart ${cartId} created with items: ${items}`);
    console.log(
      `Items: ${items.map((item) => `Product: ${item.productId}, Quantity: ${item.quantity}, Price: ${item.price}`).join(", ")}`
    );
    console.log("Processing event ShoppingCartCreatedEvent");
  }
}