import { ResultPage } from "src/core/domain/repositories/result-page";
import { ShoppingCartItem } from "../../domain/entities/shopping-cart-item";
import { ShoppingCart } from "../../domain/roots/shopping-cart";
import { ShoppingCartItemModel } from "../models/shopping-cart-item.model";
import { ShoppingCartModel } from "../models/shopping-cart.model";

export class ShoppingCartDto {
  static fromDomainToData(domain: ShoppingCart | ShoppingCart[]): ShoppingCartModel | ShoppingCartModel[] {
    if (domain instanceof Array) {
      return domain.map((cart) => this.fromDomainToData(cart) as ShoppingCartModel);
    }

    const data = new ShoppingCartModel();
    data.cart_id = domain.properties.cartId;
    data.items = domain.properties.items.map((item: ShoppingCartItem) => {
      const itemModel = new ShoppingCartItemModel();
      itemModel.product_id = item.productId;
      itemModel.quantity = item.quantity;
      itemModel.price = item.price;
      return itemModel;
    });
    data.created_at = domain.properties.createdAt;
    data.updated_at = domain.properties.updatedAt;
    data.deleted_at = domain.properties.deletedAt;

    return data;
  }

  static fromDataToDomain(data: ShoppingCartModel | ShoppingCartModel[]): ShoppingCart | ShoppingCart[] {
    if (data instanceof Array) {
      return data.map((cart) => this.fromDataToDomain(cart) as ShoppingCart);
    }

    const items = data.items.map((item: ShoppingCartItemModel) => {
      const itemDomain = new ShoppingCartItem();
      itemDomain.productId = item.product_id;
      itemDomain.quantity = item.quantity;
      itemDomain.price = item.price;
      return itemDomain;
    });

    return new ShoppingCart({
      cartId: data.cart_id,
      items,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      deletedAt: data.deleted_at,
    })
  }

  static fromDataToDomainByPage(
    data: ShoppingCartModel[], 
    total: number,
    page: number,
    pageSize: number,
  ): ResultPage<ShoppingCart> {
    const items = data.map((cart) => {
      const cartItems = cart.items.map((item: ShoppingCartItemModel) => {
        const itemDomain = new ShoppingCartItem();
        itemDomain.productId = item.product_id;
        itemDomain.quantity = item.quantity;
        itemDomain.price = item.price;
        return itemDomain;
      });
  
      return new ShoppingCart({
        cartId: cart.cart_id,
        items: cartItems,
        createdAt: cart.created_at,
        updatedAt: cart.updated_at,
        deletedAt: cart.deleted_at,
      })
    })

    return {
      items,
      total,
      page,
      pageSize,
    }
  }
}