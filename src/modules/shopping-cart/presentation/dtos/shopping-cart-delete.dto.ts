import { IsNotEmpty, IsUUID } from "class-validator";

export class ShoppingCartDeleteDto {
  @IsNotEmpty()
  @IsUUID()
  cartId: string;
}