import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import { ShoppingCartItem } from '../entities/shopping-cart-item';
import { ItemsVO } from '../value-objects/items.vo';
import { ShoppingCartDeletedEvent } from '../events/shopping-cart-deleted-event';


export type ShoppingCartRequired = {
  cartId: string;
  items: ShoppingCartItem[];
};

export type ShoppingCartOptional = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type ShoppingCartProps = ShoppingCartRequired & Partial<ShoppingCartOptional>;

export type ShoppingCartUpdate = Pick<ShoppingCartRequired, 'items'>;

export class ShoppingCart extends AggregateRoot {
  private readonly cartId: string; // Lo volvemos inmutable
  private items: ShoppingCartItem[] = [];
  private createdAt: Date;
  private updatedAt: Date | undefined; // Los undefined no se asignan
  private deletedAt: Date | undefined;

  constructor(props: ShoppingCartProps) {
    super();
    const { cartId, items, createdAt, updatedAt, deletedAt } = props;
    
    if (cartId.trim() === '') {
      throw new Error('CartId is required');
    }

    this.cartId = cartId;
    this.items = items;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  update(props: ShoppingCartUpdate) {
    const itemsVO = new ItemsVO(props.items);
    this.items = itemsVO.value;
    this.updatedAt = new Date();
  }

  delete() {
    this.apply(new ShoppingCartDeletedEvent(this.cartId));
    this.deletedAt = new Date();
  }

  get properties() {
    return {
      cartId: this.cartId,
      items: this.items,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  clone() {
    const newCart = Object.create(this);
    Object.assign(newCart, this);
    Object.assign(newCart, {cartId: uuidv4()});
  }
}

