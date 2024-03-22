import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import {
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInAuthDto,
  SignUpAuthDto,
} from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { MESSAGES } from '@/core/constant/messages';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(payload: SignInAuthDto) {
    try {
      const config = this.configService;
      const { email, password } = payload;
      if (!email || !password) {
        Logger.log(MESSAGES.EMAIL_PASSWORD_REQUIRED);
        throw new BadRequestException(MESSAGES.EMAIL_PASSWORD_REQUIRED);
      }
      const user = await this.usersService.findOneByEmail(email);
      if (user.success == false) {
        Logger.log(MESSAGES.INVALID_CREDENTIALS);
        throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS);
      } else {
        const passwordMatch = await bcrypt.compare(
          password,
          user?.data?.password as string,
        );

        if (!passwordMatch) {
          throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS);
        }
        const payload = {
          sub: user.data?.id as number,
          username: user.data?.email,
        };
        const token = await this.jwtService.signAsync(payload);
        Logger.log(MESSAGES.SIGN_IN);
        return { success: true, message: MESSAGES.SIGN_IN, token };
      }
    } catch (error) {
      Logger.error(`Error during sign in: ${error.message}`);
      return { success: false, message: error.message };
    }
  }

  async signUp(payload: SignUpAuthDto) {
    try {
      const { email, password } = payload;
      const existingUser = await this.usersService.findOneByEmail(email);
      if (existingUser.success == true) {
        return { success: false, message: MESSAGES.USER_ALREADY_EXISTS };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.usersService.create({
        ...payload,
        password: hashedPassword,
      });
      Logger.log(MESSAGES.SIGN_UP_SUCCESS);
      console.log(newUser);
      return {
        success: true,
        message: MESSAGES?.SIGN_UP_SUCCESS,
        data: newUser.data,
      };
    } catch (error) {
      Logger.error(`Error during sign up: ${error.message}`);
      return { success: false, message: MESSAGES.USER_ALREADY_EXISTS };
    }
  }

  async forgotPassword(payload: ForgotPasswordDto) {
    try {
      const { email } = payload;
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        throw new UnauthorizedException(MESSAGES.USER_NOT_FOUND);
      }
      Logger.log(MESSAGES.PASSWORD_RESET_LINK_SENT);
      return {
        success: true,
        message: MESSAGES.PASSWORD_RESET_LINK_SENT,
      };
    } catch (error) {
      Logger.error(`Error during forgot password: ${error.message}`);
      return { success: false, message: MESSAGES.USER_NOT_FOUND };
    }
  }

  async resetPassword(payload: ResetPasswordDto) {
    try {
      const { email, newPassword } = payload;
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        Logger.error(MESSAGES.USER_NOT_FOUND);
        throw new UnauthorizedException(MESSAGES.USER_NOT_FOUND);
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.usersService.updateOneById(user?.data?.id as number, {
        password: hashedPassword,
      });
      Logger.log(MESSAGES.PASSWORD_RESET_SUCCESS);
      return {
        success: true,
        message: MESSAGES.PASSWORD_RESET_SUCCESS,
      };
    } catch (error) {
      Logger.error(`Error during password reset: ${error.message}`);
      return { success: false, message: MESSAGES.PASSWORD_RESET_FAILED };
    }
  }
}
