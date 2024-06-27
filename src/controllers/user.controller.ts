import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';


@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Get(':id')
  async findUserById(@Param('id') id: any): Promise<User> {
    console.log(id);
    return await this.userRepository.findOneById(id);
  }

  @Post()
  async createUser(@Body() user:User): Promise<User> {
    return await this.userRepository.save(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: any, @Body() user:User): Promise<User> {
    await this.userRepository.update(id,user)
    return await this.userRepository.findOneById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}