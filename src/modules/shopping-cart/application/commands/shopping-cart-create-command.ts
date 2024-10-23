import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ShoppingCartFactory } from "../../domain/roots/shopping-cart.factory";
import { Inject } from "@nestjs/common";
import { ShoppingCartInfrastructure } from "../../infrastructure/shopping-cart.infrastructure";
import { ShoppingCartRepository } from "../../domain/repositories/shopping-cart.repository";

type Item = {
  readonly productId: string;
  readonly quantity: number;
  readonly price: number;
}

type Items = Item[]

export class ShoppingCartCreateCommand {
  readonly cartId: string;
  readonly items: Items;

  constructor(cartId: string, items: Items) {
    this.cartId = cartId;
    this.items = items;
  }
}

@CommandHandler(ShoppingCartCreateCommand)
export class ShoppingCartCreateCommandHandler implements
  ICommandHandler<ShoppingCartCreateCommand> {
  constructor(
    @Inject(ShoppingCartInfrastructure)
    private readonly repository: ShoppingCartRepository,
    @Inject(ShoppingCartFactory)
    private readonly shoppingCartFactory: ShoppingCartFactory,
  ) { }

  async execute(command: ShoppingCartCreateCommand): Promise<string> {
    const { cartId, items } = command;
    const cart = this.shoppingCartFactory.create({ cartId, items });
    await this.repository.save(cart);

    cart.commit();
    return "Cart created successfully";
  }
}