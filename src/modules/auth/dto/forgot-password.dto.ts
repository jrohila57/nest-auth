import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user requesting password reset.',
  })
  @IsEmail()
  readonly email: string;
}
