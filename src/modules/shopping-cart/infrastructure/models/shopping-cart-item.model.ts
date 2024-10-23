import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShoppingCartModel } from "./shopping-cart.model";

@Entity({ name: 'shopping_cart_item' })
export class ShoppingCartItemModel {
  @PrimaryGeneratedColumn()
  cart_item_id: number;

  @Column({ type: "varchar", length: 36 })
  product_id: string;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "float" })
  price: number;

  @ManyToOne(() => ShoppingCartModel, cart => cart.items)
  cart: ShoppingCartModel;
}