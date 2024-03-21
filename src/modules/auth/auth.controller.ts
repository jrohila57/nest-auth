import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInAuthDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpAuthDto) {
    return await this.authService.signUp(signUpDto);
  }
}
