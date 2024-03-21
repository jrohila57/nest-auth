import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInAuthDto {
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
}
