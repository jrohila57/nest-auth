import { UpdateUserDto } from './dto/update-user.dto';

import { Inject, Injectable } from '@nestjs/common';
import { Users } from './entities/user.entity';
import { USER_REPOSITORY } from '@/core/constant';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly usersProviders: typeof Users,
  ) {}

  async create(createUsersDto: CreateUserDto) {
    try {
      return await this.usersProviders.create(createUsersDto as Users);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.usersProviders.findAll();
    } catch (error) {
      throw new Error(`Error finding all users: ${error.message}`);
    }
  }

  async findOneByEmail(email: string) {
    try {
      return (await this.usersProviders.findOne({ where: { email } }))!;
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  async findOneById(id: number) {
    try {
      return await this.usersProviders.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }

  async updateOneById(id: number, user: UpdateUserDto) {
    try {
      const updatedUser = await this.usersProviders.update(user, {
        where: { id },
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user by ID: ${error.message}`);
    }
  }

  async deleteOneById(id: number) {
    try {
      const deletedUser = await this.usersProviders.destroy({
        where: { id },
      });
      return deletedUser;
    } catch (error) {
      throw new Error(`Error deleting user by ID: ${error.message}`);
    }
  }
}
