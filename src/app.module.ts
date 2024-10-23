import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { ShoppingCartModule } from './modules/shopping-cart/presentation/shopping-cart.module';

@Module({
  imports: [
    ShoppingCartModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [
    AppService,
    ConfigService,
  ],
})
export class AppModule { }
