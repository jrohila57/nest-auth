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
import MESSAGE from '@/core/constant/messages';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: MESSAGE.USER.SUCCESS.DATA_RETRIEVED,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: MESSAGE.USER.ERROR.ACCESS_DENIED,
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: MESSAGE.USER.SUCCESS.DATA_RETRIEVED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MESSAGE.USER.ERROR.USER_NOT_FOUND,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MESSAGE.USER.SUCCESS.USER_CREATED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: MESSAGE.USER.ERROR.VALIDATION_ERROR,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MESSAGE.USER.SUCCESS.USER_UPDATED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: MESSAGE.USER.ERROR.VALIDATION_ERROR,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MESSAGE.USER.ERROR.USER_NOT_FOUND,
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
    description: MESSAGE.USER.SUCCESS.USER_DELETED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MESSAGE.USER.ERROR.USER_NOT_FOUND,
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteOneById(id);
  }
}
