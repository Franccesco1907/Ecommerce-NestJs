import { Inject } from "@nestjs/common";
import { ResultPage } from "src/core/domain/repositories/result-page";
import { IsNull, Not, QueryFailedError, Repository } from "typeorm";
import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";
import { ShoppingCart } from "../domain/roots/shopping-cart";
import { ShoppingCartDto } from "./dtos/shopping-cart.dto";
import { ShoppingCartModel } from "./models/shopping-cart.model";
import { DatabaseException } from "src/core/exceptions/database.exception";

export class ShoppingCartInfrastructure implements ShoppingCartRepository {
  constructor(
    @Inject("ShoppingCartRepository")
    private readonly repository: Repository<ShoppingCartModel>,
  ) { }

  async save(cart: ShoppingCart): Promise<void> {
    try {
      const cartModel = ShoppingCartDto.fromDomainToData(cart) as ShoppingCartModel;

    await this.repository.save(cartModel);
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        const err = error.driverError
        throw new DatabaseException(err.sqlMessage);
      } else if (error instanceof AggregateError) {
        const err = error.errors[0];
        throw new DatabaseException(err.code);
      } else {
        throw new DatabaseException("An error ocurred while saving the cart");
      }
    }
  }

  async get(cartId: string): Promise<ShoppingCart> {
    const cartModel = await this.repository.findOne({
      where: { cart_id: cartId, deleted_at: IsNull() },
      relations: ["items"],
    });

    return ShoppingCartDto.fromDataToDomain(cartModel) as ShoppingCart;
  }

  async getByPage(page: number, pageSize: number): Promise<ResultPage<ShoppingCart>> {
    const [cartModels, total] = await this.repository.findAndCount({
      take: pageSize,
      skip: page * pageSize,
      where: { deleted_at: IsNull() },
      relations: ["items"],
    });

    return ShoppingCartDto.fromDataToDomainByPage(cartModels, total, page, pageSize);
  }

  async list(): Promise<ShoppingCart[]> {
    const cartModel = await this.repository.find({
      where: { deleted_at: IsNull() },
      relations: ["items"],
    });

    return ShoppingCartDto.fromDataToDomain(cartModel) as ShoppingCart[];
  }
}