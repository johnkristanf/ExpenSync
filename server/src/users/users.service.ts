import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
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

  async findUserByEmail(email: string): Promise<{id: number, password: string} | null> {

    try {

      const user = await this.userRepository.findOneOrFail({
        where: { email },
        select: ['id', 'password'],
      });
  
  
      const userData = { 
        id: user.id, 
        password: user.password 
      }
      
      return userData;

    } catch (error) {
      console.error('Database Error:', error);
      throw new NotFoundException('User does not exist in our records');      
    }
  }

  
  createUser(name: string, email: string, password: string): Promise<User> {
    this.logger.debug(`Creating user with email: ${email}`);
    
    const user = this.userRepository.create({ name, email, password });
    return this.userRepository.save(user);
  }
}
