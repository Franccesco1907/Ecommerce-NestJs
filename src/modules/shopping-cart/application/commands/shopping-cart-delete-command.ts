import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { ShoppingCartInfrastructure } from "../../infrastructure/shopping-cart.infrastructure";
import { ShoppingCartRepository } from "../../domain/repositories/shopping-cart.repository";

export class ShoppingCartDeleteCommand {
  readonly cartId: string;
  constructor(
    cartId: string,
  ) {
    this.cartId = cartId;
  }
}


@CommandHandler(ShoppingCartDeleteCommand)
export class ShoppingCartDeleteCommandHandler implements ICommandHandler<ShoppingCartDeleteCommand> {
  constructor(
    @Inject(ShoppingCartInfrastructure)
    private readonly repository: ShoppingCartRepository,
    private readonly eventPublisher: EventPublisher,
  ) { }

  async execute(command: ShoppingCartDeleteCommand): Promise<string> {
    
    const { cartId } = command;
    const cart = await this.repository.get(cartId);
    if (!cart) {
      throw new Error(`Cart with id ${cartId} not found`);
    }
    const shoppingCart = this.eventPublisher.mergeObjectContext(cart);
    shoppingCart.delete();
    await this.repository.save(shoppingCart);
    shoppingCart.commit();

    return `Cart with id ${command.cartId} deleted successfully`;
  }
}