import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsEnum,
  IsDate,
  MinLength,
} from 'class-validator';
import { Gender, Role } from '@/core/constant/enum';
import { authProperties } from './auth.properties';
import { MESSAGES } from '@/core/constant/messages';

export class SignUpAuthDto {
  @ApiProperty(authProperties.firstName)
  @IsString()
  readonly firstName: string;

  @ApiProperty(authProperties.lastName)
  @IsString()
  readonly lastName: string;

  @ApiProperty(authProperties.email)
  @IsEmail()
  readonly email: string;

  @ApiProperty(authProperties.password)
  @IsString()
  readonly password: string;

  @ApiProperty(authProperties.phone)
  @IsPhoneNumber()
  readonly phone: number;

  @ApiProperty(authProperties.role)
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty(authProperties.gender)
  @IsEnum(Gender)
  readonly gender: Gender;

  @ApiProperty(authProperties.dob)
  @IsDate()
  readonly dob: Date;
}

export class ForgotPasswordDto {
  @ApiProperty(authProperties.email)
  @IsEmail()
  readonly email: string;
}

export class ResetPasswordDto {
  @ApiProperty(authProperties.email)
  @IsEmail()
  readonly email: string;

  @ApiProperty(authProperties.password)
  @IsString()
  @MinLength(8, { message: MESSAGES.MIN_PASSWORD_LENGTH })
  readonly newPassword: string;
}

export class SignInAuthDto {
  @ApiProperty(authProperties.email)
  @IsEmail()
  readonly email: string;

  @ApiProperty(authProperties.password)
  @IsString()
  readonly password: string;
}
