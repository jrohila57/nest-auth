import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user requesting password reset.',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'newPassword123',
    description: 'The new password for the user account.',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  readonly newPassword: string;
}
