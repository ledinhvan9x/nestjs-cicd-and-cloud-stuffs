import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OutboxEvent } from './outbox.entity';

@Injectable()
export class OutboxService {
  constructor(
    @InjectRepository(OutboxEvent)
    private readonly repository: Repository<OutboxEvent>,
  ) {}

  async create(
    eventType: string,
    payload: Record<string, any>,
  ) {
    return this.repository.save({
      eventType,
      payload,
    });
  }

  async findPending() {
    return this.repository.find({
      where: {
        processed: false,
      },
    });
  }

  async markProcessed(id: string) {
    await this.repository.update(id, {
      processed: true,
    });
  }
}
