import { Inject, Injectable, Logger } from '@nestjs/common';
import { Users } from './user.entity';
import { USER_REPOSITORY } from '@/core/constant';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import MESSAGE from '@/core/constant/messages';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject(USER_REPOSITORY) private readonly usersProviders: typeof Users,
  ) {}

  async findAll() {
    try {
      const users = await this.usersProviders.findAll();
      Logger.log(`Fetched all users successfully. Count: ${users.length}`);
      return {
        success: true,
        message: MESSAGE.USER.SUCCESS.DATA_RETRIEVED,
        data: users,
      };
    } catch (error) {
      Logger.error('Failed to fetch users', error.stack);
      return {
        success: false,
        message: MESSAGE.USER.ERROR.DATABASE_ERROR,
        error: error.message,
      };
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.usersProviders.findOne({ where: { email } });
      if (!user) {
        Logger.warn('User not found');
        return { success: false, message: MESSAGE.USER.ERROR.USER_NOT_FOUND };
      }
      Logger.log('User found by email');
      return {
        success: true,
        message: MESSAGE.USER.SUCCESS.DATA_RETRIEVED,
        data: user,
      };
    } catch (error) {
      Logger.error('Failed to fetch user by email', error.stack);
      return {
        success: false,
        message: MESSAGE.USER.ERROR.SERVER_ERROR,
        error: error.message,
      };
    }
  }

  async findOneById(id: number) {
    try {
      const user = await this.usersProviders.findOne({ where: { id } });
      if (!user) {
        Logger.warn('User not found');
        return { success: false, message: MESSAGE.USER.ERROR.USER_NOT_FOUND };
      }
      Logger.log('User found by ID');
      return {
        success: true,
        message: MESSAGE.USER.SUCCESS.DATA_RETRIEVED,
        data: user,
      };
    } catch (error) {
      Logger.error('Failed to fetch user by ID', error.stack);
      return {
        success: false,
        message: MESSAGE.USER.ERROR.SERVER_ERROR,
        error: error.message,
      };
    }
  }

  async create(createUsersDto: CreateUserDto) {
    try {
      const user = await this.usersProviders.create(createUsersDto as Users);
      Logger.log('User created successfully');
      return {
        success: true,
        message: MESSAGE.USER.SUCCESS.USER_CREATED,
        data: user,
      };
    } catch (error) {
      Logger.error('Failed to create user', error.stack);
      return {
        success: false,
        message: MESSAGE.USER.ERROR.DATABASE_ERROR,
        error: error.message,
      };
    }
  }

  async updateOneById(id: number, user: UpdateUserDto) {
    try {
      const [updatedCount] = await this.usersProviders.update(user, {
        where: { id },
      });
      if (updatedCount === 0) {
        Logger.warn('User not found for updating');
        return { success: false, message: MESSAGE.USER.ERROR.USER_NOT_FOUND };
      }
      Logger.log('User updated successfully');
      return {
        success: true,
        message: MESSAGE.USER.SUCCESS.USER_UPDATED,
      };
    } catch (error) {
      Logger.error('Failed to update user', error.stack);
      return {
        success: false,
        message: MESSAGE.USER.ERROR.OPERATION_FAILED,
        error: error.message,
      };
    }
  }

  async deleteOneById(id: number) {
    try {
      const deletedCount = await this.usersProviders.destroy({ where: { id } });
      if (deletedCount === 0) {
        Logger.warn('User not found for deletion');
        return { success: false, message: MESSAGE.USER.ERROR.USER_NOT_FOUND };
      }
      Logger.log('User deleted successfully');
      return {
        success: true,
        message: MESSAGE.USER.SUCCESS.USER_DELETED,
      };
    } catch (error) {
      Logger.error('Failed to delete user', error.stack);
      return {
        success: false,
        message: MESSAGE.USER.ERROR.OPERATION_FAILED,
        error: error.message,
      };
    }
  }
}
