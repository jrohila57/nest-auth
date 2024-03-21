import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInAuthDto) {
    try {
      const { email, password } = signInDto;
      if (!email || !password) {
        Logger.log('Email and password are required.');
        throw new BadRequestException('Email and password are required.');
      }
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        Logger.log('Invalid credentials.');
        throw new UnauthorizedException('Invalid credentials');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const token = this.jwtService.sign({ userId: user.id });
      Logger.log(`User with email ${email} signed in successfully`);
      return { token };
    } catch (error) {
      Logger.error(`Error during sign in: ${error.message}`);
      throw error;
    }
  }

  async signUp(signUpDto: SignUpAuthDto) {
    try {
      const { email, password } = signUpDto;
      const existingUser = await this.usersService.findOneByEmail(email);
      if (existingUser) {
        throw new UnauthorizedException('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.usersService.create({
        ...signUpDto,
        password: hashedPassword,
      });
      Logger.log(`User with email ${email} signed up successfully`);
      return newUser;
    } catch (error) {
      Logger.error(`Error during sign up: ${error.message}`);
      throw error;
    }
  }
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const { email } = forgotPasswordDto;
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      Logger.log(`Password reset link sent to ${email}`);
    } catch (error) {
      Logger.error(`Error during forgot password: ${error.message}`);
      throw error;
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const { email, newPassword } = resetPasswordDto;
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        Logger.error('User not found');
        throw new UnauthorizedException('User not found');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.usersService.updateOneById(user.id, {
        password: hashedPassword,
      });
      Logger.log(`Password reset successfully for user with email ${email}`);
    } catch (error) {
      Logger.error(`Error during password reset: ${error.message}`);
      throw error;
    }
  }
}
