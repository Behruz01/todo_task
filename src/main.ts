import "dotenv/config"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("api")
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Nation website")
    .setDescription("The nation.uz website API documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("docs", app, document)

  const PORT = process.env.PORT || 3003
  await app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}
bootstrap();
