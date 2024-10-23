import { ApiProperty } from "@nestjs/swagger";

export class GenericError {
  @ApiProperty({ type: "number", required: true, example: 400 })
  statusCode?: number;

  @ApiProperty({ type: "string", required: true, example: "Message Error" })
  message?: string;
}