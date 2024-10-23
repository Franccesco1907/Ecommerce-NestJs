import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ShoppingCartRepository } from "../../domain/repositories/shopping-cart.repository";
import { ShoppingCartInfrastructure } from "../../infrastructure/shopping-cart.infrastructure";
import { ShoppingCart } from "../../domain/roots/shopping-cart";

export class ShoppingCartGetAllQuery {}

@QueryHandler(ShoppingCartGetAllQuery)
export class ShoppingCartGetAllQueryHandler implements IQueryHandler<ShoppingCartGetAllQuery> {
  constructor(
    @Inject(ShoppingCartInfrastructure)
    private readonly repository: ShoppingCartRepository,
  ) { }

  execute(query: ShoppingCartGetAllQuery): Promise<ShoppingCart[]> {
    return this.repository.list();
  }
}