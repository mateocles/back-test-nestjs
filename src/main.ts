import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get('ConfigService').envConfig;
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Docs Backend')
    .setDescription('This is the documentation of the backend.')
    .setVersion('1.0')
    .addTag('Docs')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  const port = process.env.PORT || configService.APP_PORT || '5000';
  await app.listen(port, '0.0.0.0');
  console.log(`Server running on ${configService.APP_HOST_SERVER}:${port}/`);
}
bootstrap();