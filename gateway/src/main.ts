import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('users')
    .addTag('items')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: 'authorization', in: 'header' },
      'authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  console.log('====================================');
  console.log('document -->', JSON.stringify(document));
  console.log('====================================');
  SwaggerModule.setup('api', app, document);
  await app.listen(new ConfigService().get('port'));
}
bootstrap();
