import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Gender, Role } from '@/core/constant/enum';

export class SignUpAuthDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user.',
  })
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user.',
  })
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user.',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password for the user account.',
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number of the user.',
  })
  @IsPhoneNumber()
  readonly phone: number;

  @ApiProperty({
    enum: Role,
    description: 'The role of the user.',
  })
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty({
    enum: Gender,
    description: 'The gender of the user.',
  })
  @IsEnum(Gender)
  readonly gender: Gender;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the user in YYYY-MM-DD format.',
  })
  @IsDate()
  readonly dob: Date;
}
