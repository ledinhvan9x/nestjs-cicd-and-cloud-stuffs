import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('redis-test')
  async redisTest() {
    await this.redisService.set('hello', 'world');
    const value = await this.redisService.get('hello');

    return { value };
  }

  @Get('redis-ttl')
  async testTtl() {
    await this.redisService.setWithTtl('temp', 'hello', 10);
    const value = await this.redisService.get('temp');
    return { value };
  }
}
