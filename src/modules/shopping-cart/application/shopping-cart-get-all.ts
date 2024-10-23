import { Inject } from "@nestjs/common";
import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";
import { ShoppingCartInfrastructure } from "../infrastructure/shopping-cart.infrastructure";

export class ShoppingCartGetAll {
  constructor(
    @Inject(ShoppingCartInfrastructure)
    private readonly repository: ShoppingCartRepository,
  ) { }

  async list() {
    return await this.repository.list();
  }
}