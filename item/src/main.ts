import { NestFactory } from '@nestjs/core';
import { ItemModule } from './items.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ItemModule, {
    transport: Transport.TCP,
    options: {
      host: 'items',
      port: new ConfigService().get('port'),
    },
  } as TcpOptions);
  await app.listen();
}
bootstrap();
