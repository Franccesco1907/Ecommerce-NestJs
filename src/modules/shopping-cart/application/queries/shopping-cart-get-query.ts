import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ShoppingCartRepository } from "../../domain/repositories/shopping-cart.repository";
import { ShoppingCartInfrastructure } from "../../infrastructure/shopping-cart.infrastructure";
import { ShoppingCart } from "../../domain/roots/shopping-cart";

export class ShoppingCartGetQuery {
  readonly cartId: string;

  constructor(cartId: string) {
    this.cartId = cartId;
  }
}

@QueryHandler(ShoppingCartGetQuery)
export class ShoppingCartGetQueryHandler implements IQueryHandler<ShoppingCartGetQuery> {
  constructor(
    @Inject(ShoppingCartInfrastructure)
    private readonly repository: ShoppingCartRepository,
  ) { }

  execute(query: ShoppingCartGetQuery): Promise<ShoppingCart | undefined> {
    return this.repository.get(query.cartId);
  }
}