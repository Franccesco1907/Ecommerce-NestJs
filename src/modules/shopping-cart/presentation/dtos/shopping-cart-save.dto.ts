import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsUUID, Min, ValidateNested } from "class-validator";

export class ShoppingCartItemSaveDto {
  @ApiProperty({ type: "string", required: true, example: "a385e3bf-3bbe-4d5d-8d24-3a81c92ae8bd" })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({ type: "number", required: true, example: 2 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  quantity: number;

  @ApiProperty({ type: "number", required: true, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0.01)
  price: number;
}

export class ShoppingCartSaveDto {
  @ApiProperty({ type: "number", required: true, example: "28792934-d6f0-4064-be91-6a59ca455b62" })
  @IsNotEmpty()
  @IsUUID()
  cartId: string;

  @ApiProperty({ type: ShoppingCartItemSaveDto, required: true, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ShoppingCartItemSaveDto)
  items: ShoppingCartItemSaveDto[];
}