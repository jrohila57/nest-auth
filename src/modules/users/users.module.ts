import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersRepository } from './users.repository';

@Module({
  imports: [],
  providers: [UsersService, ...usersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {
  constructor(private usersService: UsersService) {}
}
