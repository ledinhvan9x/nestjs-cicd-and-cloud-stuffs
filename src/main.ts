import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { RedisService } from './redis/redis.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redisService = app.get(RedisService);
  app.useGlobalGuards(new RateLimitGuard(redisService));
  await app.listen(process.env.PORT || 3000, () => {
    console.log(`Application is running on: ${process.env.PORT}`);
  });
}
bootstrap();
