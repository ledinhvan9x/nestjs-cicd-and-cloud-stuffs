import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private readonly redis: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = `rate:${req.ip}`;

    const count = await this.redis.incr(key);

    if (count === 1) {
      await this.redis.expire(key, 60);
    }

    if (count > 10) {
      return false;
    }

    return true;
  }

  //   async canActivate(context: ExecutionContext): Promise<boolean> {
  //     const req = context.switchToHttp().getRequest();

  //     const key = `rate:${req.ip}`;

  //     const current = await this.redis.get(key);

  //     if (!current) {
  //       await this.redis.setWithTtl(key, '1', 60);
  //       return true;
  //     }

  //     const count = parseInt(current);

  //     if (count >= 10) {
  //       return false; // block request
  //     }

  //     await this.redis.setWithTtl(key, String(count + 1), 60);

  //     return true;
  //   }
}
