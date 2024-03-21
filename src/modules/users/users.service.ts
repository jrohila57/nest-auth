import { UpdateUserDto } from './dto/update-user.dto';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Users } from './entities/user.entity';
import { USER_REPOSITORY } from '@/core/constant';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly usersProviders: typeof Users,
  ) {}

  async findAll() {
    try {
      const users = await this.usersProviders.findAll();
      Logger.log(`Fetched all users successfully`);
      return { success: true, data: users };
    } catch (error) {
      Logger.error(`Failed to fetch all users: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = (await this.usersProviders.findOne({ where: { email } }))!;
      if (!user) {
        Logger.log('User not found');
        return { success: false, error: 'User not found' };
      }
      Logger.log(`Fetched user with email ${email} successfully`);
      return { success: true, data: user };
    } catch (error) {
      Logger.error(`Failed to fetch user ${email}: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async findOneById(id: number) {
    try {
      const user = await this.usersProviders.findOne({ where: { id } });
      if (!user) {
        Logger.log('User not found! Check User Id');
        return { success: false, error: 'User not found' };
      }
      Logger.log(`Fetched user with ID ${id} successfully`);
      return { success: true, data: user };
    } catch (error) {
      Logger.error(`Failed to fetch user with ID ${id}: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async create(createUsersDto: CreateUserDto) {
    try {
      const user = this.usersProviders.create(createUsersDto as Users);
      Logger.log(`Created user with  ${createUsersDto.email} successfully`);
      return { success: true, data: user };
    } catch (error) {
      Logger.error(`Failed to create user: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
  async updateOneById(id: number, user: UpdateUserDto) {
    try {
      const updatedUser = await this.usersProviders.update(user, {
        where: { id },
      });
      Logger.log(`Updated user with ID ${id} successfully`);
      return { success: true, data: updatedUser };
    } catch (error) {
      Logger.error(`Failed to update user with ID ${id}: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async deleteOneById(id: number) {
    try {
      const deletedUser = await this.usersProviders.destroy({
        where: { id },
      });
      Logger.log(`Deleted user with ID ${id} successfully`);
      return { success: true, data: deletedUser };
    } catch (error) {
      Logger.error(`Failed to delete user with ID ${id}: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}
