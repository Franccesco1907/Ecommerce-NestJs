import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ShoppingCartGetByPageDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  size: number;
}