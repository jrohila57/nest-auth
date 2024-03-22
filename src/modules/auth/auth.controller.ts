import { Body, Controller, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInAuthDto,
  SignUpAuthDto,
} from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { MESSAGES } from '@/core/constant/messages';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-in')
  @ApiResponse({
    status: HttpStatus.OK,
    description: MESSAGES.SIGN_IN,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: MESSAGES.INVALID_CREDENTIALS,
  })
  async signIn(@Body() signInDto: SignInAuthDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MESSAGES.SIGN_UP_SUCCESS,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: MESSAGES.INVALID_USER_DATA,
  })
  async signUp(@Body() signUpDto: SignUpAuthDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('forgot-password')
  @ApiResponse({
    status: HttpStatus.OK,
    description: MESSAGES.PASSWORD_RESET_EMAIL_SENT,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: MESSAGES.INVALID_EMAIL,
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @ApiResponse({
    status: HttpStatus.OK,
    description: MESSAGES.PASSWORD_RESET_SUCCESS,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: MESSAGES.INVALID_RESET_DATA,
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }
}
