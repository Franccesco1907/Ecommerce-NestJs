import { Inject } from "@nestjs/common";
import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";
import { ShoppingCart } from "../domain/roots/shopping-cart";
import { ShoppingCartInfrastructure } from "../infrastructure/shopping-cart.infrastructure";

export class ShoppingCartSave {
  constructor(
    @Inject(ShoppingCartInfrastructure) 
    private readonly repository: ShoppingCartRepository,
  ) {}

  async save(cart: ShoppingCart) {
    await this.repository.save(cart);
  }
}