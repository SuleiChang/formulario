import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { engine } from 'express-handlebars';
import {
  formatDate,
  eq,
  formatDateForInput,
} from './helpers/handlebars.helpers'; // Import the formatDateForInput helper

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
        formatDate, // Register the formatDate helper
        eq, // Register the eq helper
        formatDateForInput, // Register the formatDateForInput helper
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
