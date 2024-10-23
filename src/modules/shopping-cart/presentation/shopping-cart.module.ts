import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DatabaseModule } from "src/database/database.module";
import { ShoppingCartCreateCommandHandler } from "../application/commands/shopping-cart-create-command";
import { ShoppingCartDeleteCommandHandler } from "../application/commands/shopping-cart-delete-command";
import { ShoppingCartCreatedEventHandler } from "../application/events/shopping-cart-created-event-handler";
import { ShoppingCartDeletedEventHandler } from "../application/events/shopping-cart-deleted-event-handler";
import { ShoppingCartGetAllQueryHandler } from "../application/queries/shopping-cart-get-all-query";
import { ShoppingCartGetQueryHandler } from "../application/queries/shopping-cart-get-query";
import { ShoppingCartGet } from "../application/shopping-cart-get";
import { ShoppingCartGetAll } from "../application/shopping-cart-get-all";
import { ShoppingCartGetByPage } from "../application/shopping-cart-get-by-page";
import { ShoppingCartSave } from "../application/shopping-cart-save";
import { ShoppingCartFactory } from "../domain/roots/shopping-cart.factory";
import { shoppingCartProviders } from "../infrastructure/providers/shopping-cart.provider";
import { ShoppingCartInfrastructure } from "../infrastructure/shopping-cart.infrastructure";
import { ShoppingCartController } from "./shopping-cart.controller";


const providersApplication = [
  ShoppingCartSave,
  ShoppingCartGet,
  ShoppingCartGetByPage,
  ShoppingCartGetAll,
  ShoppingCartCreateCommandHandler,
  ShoppingCartGetQueryHandler,
  ShoppingCartGetAllQueryHandler,
  ShoppingCartDeleteCommandHandler,
  ShoppingCartCreatedEventHandler,
  ShoppingCartDeletedEventHandler,
];
const providersInfrastructure = [ShoppingCartInfrastructure];
const providersDomain = [ShoppingCartFactory];

@Module({
  imports: [
    DatabaseModule,
    CqrsModule,
  ],
  controllers: [ShoppingCartController],
  providers: [
    ...providersApplication,
    ...providersInfrastructure,
    ...providersDomain,
    ...shoppingCartProviders,
  ],
})
export class ShoppingCartModule { }