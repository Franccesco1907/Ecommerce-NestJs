import { Inject } from "@nestjs/common";
import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";
import { ShoppingCartInfrastructure } from "../infrastructure/shopping-cart.infrastructure";

export class ShoppingCartGetByPage {
  constructor(
    @Inject(ShoppingCartInfrastructure)
    private readonly repository: ShoppingCartRepository,
  ) { }

  async getByPage(page: number, pageSize: number) {
    return await this.repository.getByPage(page, pageSize);
  }
}