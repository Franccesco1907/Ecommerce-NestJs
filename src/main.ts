import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformerResponseInterceptor } from './core/interceptors/transformer-response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const context = await NestFactory.createApplicationContext(AppModule);
  const port = context.get(ConfigService).get('PORT');
  app.useGlobalInterceptors(new TransformerResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('API for Ecommerce cart')
    .setVersion('1.0');

  const documentBuild = config.build();
  const document = SwaggerModule.createDocument(app, documentBuild, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  });

  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    }
  })

  await app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
bootstrap();
