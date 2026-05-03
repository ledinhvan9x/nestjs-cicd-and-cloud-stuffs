import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly redis: RedisService,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const key = `user:${id}`;

    // 1. check Redis first
    const cached = await this.redis.get(key);

    if (cached) {
      console.log('return cache', cached);
      return JSON.parse(cached);
    }

    // 2. fallback to DB
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) return null;

    // 3. store to Redis
    await this.redis.setWithTtl(
      key,
      JSON.stringify(user),
      60 + Math.floor(Math.random() * 10), // ~60s
    );

    console.log('return DB', user);
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.userRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return { message: 'User deleted' };
  }
}
