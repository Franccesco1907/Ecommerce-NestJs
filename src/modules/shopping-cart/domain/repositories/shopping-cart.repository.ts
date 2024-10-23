import { ResultPage } from "src/core/domain/repositories/result-page";
import { ShoppingCart } from "../roots/shopping-cart";

export type ShoppingCartRepository = {
  save: (cart: ShoppingCart) => Promise<void>;
  get: (cartId: string) => Promise<ShoppingCart | undefined>;
  getByPage: (page: number, pageSize: number) => Promise<ResultPage<ShoppingCart>>;
  list: () => Promise<ShoppingCart[]>;
}