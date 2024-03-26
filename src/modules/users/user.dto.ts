import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsDate,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Gender, Role } from '@/core/constant/enum';
import { userProperties } from './user.properties';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty(userProperties.firstName)
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty(userProperties.lastName)
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty(userProperties.email)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty(userProperties.phone)
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: number;

  @IsBoolean()
  readonly isVerified: boolean;

  @ApiProperty(userProperties.role)
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty(userProperties.gender)
  @IsNotEmpty()
  @IsEnum(Gender)
  readonly gender: Gender;

  @ApiProperty(userProperties.dob)
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  readonly dob: Date;

  @ApiProperty(userProperties.password)
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty(userProperties.firstName)
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @ApiProperty(userProperties.password)
  @IsOptional()
  @IsString()
  readonly password?: string;

  @ApiProperty(userProperties.lastName)
  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsOptional()
  @IsBoolean()
  readonly isVerified?: boolean;

  @ApiProperty(userProperties.email)
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty(userProperties.phone)
  @IsOptional()
  @IsPhoneNumber()
  readonly phone?: number;

  @ApiProperty(userProperties.role)
  @IsOptional()
  @IsEnum(Role)
  readonly role?: Role;

  @ApiProperty(userProperties.gender)
  @IsOptional()
  @IsEnum(Gender)
  readonly gender?: Gender;

  @ApiProperty(userProperties.dob)
  @IsOptional()
  @IsDate()
  readonly dob?: Date;
}
