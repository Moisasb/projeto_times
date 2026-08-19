import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Times')
    .setDescription('API para gerenciamento de times de futebol')
    .setVersion('1.0')
    .build();
    
  const documento = SwaggerModule.createDocument(app, config);
  
  // O primeiro parâmetro 'api_times' será o endereço da documentação na URL
  SwaggerModule.setup('api_times', app, documento);

  await app.listen(3000);
}
bootstrap();