import { ApiProperty } from "@nestjs/swagger";

export class ShoppingCartCreateResponseDto {
  @ApiProperty({ type: "number", required: true, example: 201 })
  statusCode: number;

  @ApiProperty({ type: "string", required: true, example: "Shopping cart created successfully" })
  result: string;
}