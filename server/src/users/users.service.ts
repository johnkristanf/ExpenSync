import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private logger = new Logger(UsersService.name, { timestamp: true })

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    this.logger.debug(`Login Email: ${email}`);

    return await this.userRepository.findOne({
      where: {email: email}
    });
  }

  
  createUser(name: string, email: string, password: string): Promise<User> {
    this.logger.debug(`Creating user with email: ${email}`);
    
    const user = this.userRepository.create({ name, email, password });
    return this.userRepository.save(user);
  }
}
