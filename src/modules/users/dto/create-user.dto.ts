import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Gender, Role } from '@/core/constant/enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    required: true,
    description: 'The first name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
    required: true,
    description: 'The last name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    required: true,
    description: 'The email address of the user.',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '+1234567890',
    required: true,
    description: 'The phone number of the user.',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: number;

  @ApiProperty({
    enum: Role,
    required: true,
    description: 'The role of the user.',
  })
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty({
    enum: Gender,
    required: true,
    description: 'The gender of the user.',
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  readonly gender: Gender;

  @ApiProperty({
    example: '1990-01-01',
    required: true,
    description: 'The date of birth of the user in YYYY-MM-DD format.',
  })
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  readonly dob: Date;

  @ApiProperty({
    example: 'password123',
    required: true,
    description: 'The password for the user account.',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
