import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { engine } from 'express-handlebars';
import { formatDate } from './helpers/handlebars.helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', '/src/public'));
  app.setBaseViewsDir(join(__dirname, '..', '/src/views'));
  app.setViewEngine('hbs');
  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      defaultLayout: undefined,
      helpers: {
        formatDate, // Use the formatDate function directly
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
