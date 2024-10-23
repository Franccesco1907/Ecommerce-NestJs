import { DataSource } from "typeorm";
import { ShoppingCartModel } from "../models/shopping-cart.model";

export const shoppingCartProviders = [
  {
    provide: "ShoppingCartRepository",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ShoppingCartModel),
    inject: ["DATABASE"]
  }
]