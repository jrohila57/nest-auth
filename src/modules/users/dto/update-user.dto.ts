import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Gender, Role } from '@/core/constant/enum';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'John',
    required: false,
    description: 'The updated first name of the user.',
  })
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @ApiProperty({
    example: 'password123',
    required: false,
    description: 'The updated password for the user account.',
  })
  @IsOptional()
  @IsString()
  readonly password?: string;

  @ApiProperty({
    example: 'Doe',
    required: false,
    description: 'The updated last name of the user.',
  })
  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    required: false,
    description: 'The updated email address of the user.',
  })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({
    example: '+1234567890',
    required: false,
    description: 'The updated phone number of the user.',
  })
  @IsOptional()
  @IsPhoneNumber()
  readonly phone?: number;

  @ApiProperty({
    enum: Role,
    required: false,
    description: 'The updated role of the user.',
  })
  @IsOptional()
  @IsEnum(Role)
  readonly role?: Role;

  @ApiProperty({
    enum: Gender,
    required: false,
    description: 'The updated gender of the user.',
  })
  @IsOptional()
  @IsEnum(Gender)
  readonly gender?: Gender;

  @ApiProperty({
    example: '1990-01-01',
    required: false,
    description: 'The updated date of birth of the user in YYYY-MM-DD format.',
  })
  @IsOptional()
  @IsDate()
  readonly dob?: Date;
}
