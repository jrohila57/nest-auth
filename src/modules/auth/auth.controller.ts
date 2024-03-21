import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully signed in.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid email or password.',
  })
  async signIn(@Body() signInDto: SignInAuthDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('signup')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully signed up.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid user data.',
  })
  async signUp(@Body() signUpDto: SignUpAuthDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('forgot')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset email sent successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid email.',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password successfully reset.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid reset request data.',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }
}
