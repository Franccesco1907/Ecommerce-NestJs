import { Inject } from "@nestjs/common";
import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";
import { ShoppingCartInfrastructure } from "../infrastructure/shopping-cart.infrastructure";

export class ShoppingCartGet {
  constructor(
    @Inject(ShoppingCartInfrastructure)
    private readonly repository: ShoppingCartRepository,
  ) { }

  async get(cartId: string) {
    return await this.repository.get(cartId);
  }
}