import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🚀 Starting NestJS server...');

  const app = await NestFactory.create(AppModule);

  console.log('🛠️ Setting up middlewares and configurations...');

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  console.log('✅ CORS enabled');

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());
  console.log('✅ Validation pipe enabled');

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🎉 Server is running on port ${port}`);
  console.log('🌐 Ready to accept requests!');
}

bootstrap().catch((err) => {
  console.error('❌ Error during app initialization:', err);
});
