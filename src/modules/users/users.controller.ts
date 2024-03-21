import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      Logger.log(`Fetched all users successfully`);
      return { success: true, data: users };
    } catch (error) {
      Logger.error(`Failed to fetch all users: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOneById(id);
      if (!user) throw new Error('User not found');
      Logger.log(`Fetched user with ID ${id} successfully`);
      return { success: true, data: user };
    } catch (error) {
      Logger.error(`Failed to fetch user with ID ${id}: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  @Post()
  async create(@Body() createUsersDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUsersDto);
      Logger.log(
        `Created user with email ${createUsersDto.email} successfully`,
      );
      return { success: true, data: user };
    } catch (error) {
      Logger.error(`Failed to create user: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.updateOneById(id, updateUserDto);
      Logger.log(`Updated user with ID ${id} successfully`);
      return { success: true, data: user };
    } catch (error) {
      Logger.error(`Failed to update user with ID ${id}: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.deleteOneById(id);
      Logger.log(`Deleted user with ID ${id} successfully`);
      return { success: true, data: user };
    } catch (error) {
      Logger.error(`Failed to delete user with ID ${id}: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}
