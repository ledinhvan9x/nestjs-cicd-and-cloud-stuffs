import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
  }

  async onModuleInit() {
    await this.redis.ping();
    console.log('Redis connected');
  }

  getClient() {
    return this.redis;
  }

  async set(key: string, value: string) {
    return this.redis.set(key, value);
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async setWithTtl(key: string, value: string, seconds: number) {
    return this.redis.set(key, value, 'EX', seconds);
  }
}
