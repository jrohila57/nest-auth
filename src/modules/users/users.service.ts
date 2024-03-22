import { Inject, Injectable, Logger } from '@nestjs/common';
import { Users } from './user.entity';
import { USER_REPOSITORY } from '@/core/constant';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { MESSAGES } from '@/core/constant/messages';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly usersProviders: typeof Users,
  ) {}

  async findAll() {
    try {
      const users = await this.usersProviders.findAll();
      Logger.log(`${MESSAGES.FETCH_SUCCESS} All users fetched successfully`);
      return { success: true, message: MESSAGES.FETCH_SUCCESS, data: users };
    } catch (error) {
      Logger.error(`${MESSAGES.FETCH_FAILED} Error: ${error.message}`);
      return {
        success: false,
        message: MESSAGES.FETCH_FAILED,
        error: error.message,
      };
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = (await this.usersProviders.findOne({ where: { email } }))!;
      if (!user) {
        Logger.log(MESSAGES.USER_NOT_FOUND);
        return { success: false, message: MESSAGES.USER_NOT_FOUND };
      }
      Logger.log(`${MESSAGES.FETCH_SUCCESS} Email: ${email}`);
      return { success: true, message: MESSAGES.FETCH_SUCCESS, data: user };
    } catch (error) {
      Logger.error(
        `${MESSAGES.FETCH_FAILED} Email: ${email}. Error: ${error.message}`,
      );
      return {
        success: false,
        message: MESSAGES.FETCH_FAILED,
        error: error.message,
      };
    }
  }

  async findOneById(id: number) {
    try {
      const user = await this.usersProviders.findOne({ where: { id } });
      if (!user) {
        Logger.log('User not found! Check User Id');
        return { success: false, message: 'User not found' };
      }
      Logger.log(`${MESSAGES.FETCH_SUCCESS} ID: ${id}`);
      return { success: true, message: MESSAGES.FETCH_SUCCESS, data: user };
    } catch (error) {
      Logger.error(
        `${MESSAGES.FETCH_FAILED} ID: ${id}. Error: ${error.message}`,
      );
      return {
        success: false,
        message: MESSAGES.FETCH_FAILED,
        error: error.message,
      };
    }
  }

  async create(createUsersDto: CreateUserDto) {
    try {
      const user = await this.usersProviders.create(createUsersDto as Users);
      Logger.log(
        `${MESSAGES.USER_CREATED_SUCCESSFULLY} Email: ${createUsersDto.email}`,
      );
      return {
        success: true,
        message: MESSAGES.USER_CREATED_SUCCESSFULLY,
        data: user,
      };
    } catch (error) {
      Logger.error(`${MESSAGES.FAILED_TO_CREATE_USER} Error: ${error.message}`);
      return {
        success: false,
        message: MESSAGES.FAILED_TO_CREATE_USER,
        error: error.message,
      };
    }
  }

  async updateOneById(id: number, user: UpdateUserDto) {
    try {
      const updatedUser = await this.usersProviders.update(user, {
        where: { id },
      });
      Logger.log(`${MESSAGES.USER_UPDATED_SUCCESSFULLY} ID: ${id}`);
      return {
        success: true,
        message: MESSAGES.USER_UPDATED_SUCCESSFULLY,
        data: updatedUser,
      };
    } catch (error) {
      Logger.error(
        `${MESSAGES.FAILED_TO_UPDATE_USER} ID: ${id}. Error: ${error.message}`,
      );
      return {
        success: false,
        message: MESSAGES.FAILED_TO_UPDATE_USER,
        error: error.message,
      };
    }
  }

  async deleteOneById(id: number) {
    try {
      const deletedUser = await this.usersProviders.destroy({
        where: { id },
      });
      Logger.log(`${MESSAGES.USER_DELETED_SUCCESSFULLY} ID: ${id}`);
      return {
        success: true,
        message: MESSAGES.USER_DELETED_SUCCESSFULLY,
        data: deletedUser,
      };
    } catch (error) {
      Logger.error(
        `${MESSAGES.FAILED_TO_DELETE_USER} ID: ${id}. Error: ${error.message}`,
      );
      return {
        success: false,
        message: MESSAGES.FAILED_TO_DELETE_USER,
        error: error.message,
      };
    }
  }
}
