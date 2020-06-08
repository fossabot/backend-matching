import { NestFactory } from '@nestjs/core';
import { CrudConfigService } from '@nestjsx/crud';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

// CrudConfigService has to be loaded before AppModule is imported
CrudConfigService.load({
  query: {
    limit: 25,
    cache: 2000,
    alwaysPaginate: true
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase']
  }
});

// prettier-ignore
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  /*
   * App configuration
   * */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  app.use(helmet());

  /* Swagger */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Matching API')
    .setDescription('Microservice which handles the matching functionality of the impAct platform.')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('APP_PORT'));
}

bootstrap();
