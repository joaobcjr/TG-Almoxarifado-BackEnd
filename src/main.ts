import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './ExceptionFIlter';
import { typeOrmConfig } from 'config/typeorm.config';


async function bootstrap(): Promise<void> {
  require('dotenv').config();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.enableCors({
    origin: "*"
  });
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT);

  console.log(`Running at port => ${port}`)
}
console.log(`Inciando API, configuração DB =>`)
console.log(typeOrmConfig)
bootstrap();
