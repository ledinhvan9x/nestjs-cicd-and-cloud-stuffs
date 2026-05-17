import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class HealthCron {
  @Cron('*/10 * * * * *') // mỗi 10 giây (test)
  handleCron() {
    console.log('🔁 Cron running every 10 seconds');
  }
}
