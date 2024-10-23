import { IsNotEmpty, IsUUID } from "class-validator";

export class ShoppingCartGetDto {
  @IsNotEmpty()
  @IsUUID()
  cartId: string;
}