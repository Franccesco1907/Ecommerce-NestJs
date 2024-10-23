import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ShoppingCartItemModel } from "./shopping-cart-item.model";
import { BaseModel } from "src/core/infrastructure/base.model";

@Entity({ name: 'shopping_cart' })
export class ShoppingCartModel extends BaseModel {
  @PrimaryColumn()
  cart_id: string;

  @OneToMany(() => ShoppingCartItemModel, item => item.cart, { cascade: true })
  items: ShoppingCartItemModel[];
}