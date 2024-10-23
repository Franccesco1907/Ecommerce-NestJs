import { BadRequestException, Body, Controller, Delete, Get, Inject, InternalServerErrorException, Param, Post, Version } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ClientException } from "src/core/exceptions/client.exception";
import { DatabaseException } from "src/core/exceptions/database.exception";
import { GenericError } from "../../../core/errors/generic.error";
import { ShoppingCartCreateCommand } from "../application/commands/shopping-cart-create-command";
import { ShoppingCartDeleteCommand } from "../application/commands/shopping-cart-delete-command";
import { ShoppingCartGetAllQuery } from "../application/queries/shopping-cart-get-all-query";
import { ShoppingCartGetQuery } from "../application/queries/shopping-cart-get-query";
import { ShoppingCartGet } from "../application/shopping-cart-get";
import { ShoppingCartGetAll } from "../application/shopping-cart-get-all";
import { ShoppingCartGetByPage } from "../application/shopping-cart-get-by-page";
import { ShoppingCartSave } from "../application/shopping-cart-save";
import { ShoppingCartCreateResponseDto } from "./dtos/responses/shopping-cart-create-response.dto";
import { ShoppingCartDeleteDto } from "./dtos/shopping-cart-delete.dto";
import { ShoppingCartGetByPageDto } from "./dtos/shopping-cart-get-by-page.dto";
import { ShoppingCartGetDto } from "./dtos/shopping-cart-get.dto";
import { ShoppingCartSaveDto } from "./dtos/shopping-cart-save.dto";

@ApiTags('shopping cart')
@Controller('shopping-cart')
// @UseInterceptors(TransformerResponseInterceptor)
export class ShoppingCartController {
  constructor(
    @Inject(ShoppingCartSave) private readonly applicationSave: ShoppingCartSave,
    @Inject(ShoppingCartGet) private readonly applicationGet: ShoppingCartGet,
    @Inject(ShoppingCartGetByPage) private readonly applicationGetByPage: ShoppingCartGetByPage,
    @Inject(ShoppingCartGetAll) private readonly applicationGetAll: ShoppingCartGetAll,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new shopping cart' })
  @ApiCreatedResponse({
    description: 'Thre record has been sucessfully created.',
    type: ShoppingCartCreateResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request', type: GenericError })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: GenericError })
  async insert(@Body() body: ShoppingCartSaveDto) {
    try {
      const { cartId, items } = body;
      const command = new ShoppingCartCreateCommand(cartId, items);
      const response = this.commandBus.execute(command);
      return response;
    } catch (error: unknown) {
      if (error instanceof DatabaseException) {
        throw new InternalServerErrorException(error.message, error.name);
      } else if (error instanceof ClientException) {
        throw new BadRequestException(error.message, error.name);
      }
    }
  }

  @Get()
  async list() {
    const query = new ShoppingCartGetAllQuery();
    return await this.queryBus.execute(query);
  }

  @Version("2")
  @Get()
  async list_v2() {
    const query = new ShoppingCartGetAllQuery();
    return await this.queryBus.execute(query);
  }

  @Get("/:cartId")
  async getOne(@Param() params: ShoppingCartGetDto) {
    const { cartId } = params;

    const query = new ShoppingCartGetQuery(cartId);

    return await this.queryBus.execute(query);
  }

  @Get("/page/:page/size/:size")
  async getByPage(@Param() params: ShoppingCartGetByPageDto) {
    const { page, size } = params;

    return await this.applicationGetByPage.getByPage(page, size);
  }

  @Delete("/:cartId")
  async delete(@Param() params: ShoppingCartDeleteDto) {
    const { cartId } = params;
    const command = new ShoppingCartDeleteCommand(cartId);
    return await this.commandBus.execute(command);
    // const cart = await this.applicationGet.get(cartId);
    // cart.delete();
    // await this.applicationSave.save(cart);
  }
}