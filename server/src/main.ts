import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4201', // Allow requests from Angular app
    methods: 'GET,POST,PATCH,DELETE,OPTIONS', // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
  });

  const config = new DocumentBuilder()
    .setTitle('Fleet Management API')
    .setDescription('API for managing vehicle fleet')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
