import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MESSAGES } from '@/core/constant/messages';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: MESSAGES.FETCH_SUCCESS,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: MESSAGES.FORBIDDEN,
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: MESSAGES.FETCH_SUCCESS,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MESSAGES.USER_NOT_FOUND,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MESSAGES.USER_CREATED_SUCCESSFULLY,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: MESSAGES.BAD_REQUEST,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MESSAGES.USER_UPDATED_SUCCESSFULLY,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: MESSAGES.BAD_REQUEST,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MESSAGES.USER_NOT_FOUND,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateOneById(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: MESSAGES.USER_DELETED_SUCCESSFULLY,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MESSAGES.USER_NOT_FOUND,
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteOneById(id);
  }
}
