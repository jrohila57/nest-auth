import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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
import MESSAGE from '@/core/constant/messages';
import { OtpService } from '../otp/otp.service';

function isExpired(expirationDate: Date) {
  const currentDate = new Date();

  return expirationDate <= currentDate;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private otpService: OtpService,
  ) {}

  async signIn(payload: SignInAuthDto) {
    try {
      const { email, password } = payload;
      if (!email || !password) {
        Logger.log(MESSAGE.AUTH.ERROR.USER_NOT_FOUND);
        return MESSAGE.AUTH.ERROR.USER_NOT_FOUND;
      }
      const user = await this.usersService.findOneByEmail(email);
      if (user.success == false) {
        Logger.log(MESSAGE.AUTH.ERROR.INVALID_CREDENTIALS);
        return MESSAGE.AUTH.ERROR.INVALID_CREDENTIALS;
      } else {
        const passwordMatch = await bcrypt.compare(
          password,
          user?.data?.password as string,
        );

        if (!passwordMatch) {
          return MESSAGE.AUTH.ERROR.INVALID_CREDENTIALS;
        }
        const token = await this.jwtService.signAsync({
          sub: user.data?.id as number,
          username: user.data?.email,
        });
        Logger.log(MESSAGE.AUTH.SUCCESS.LOGIN_SUCCESSFUL);
        return {
          success: true,
          message: MESSAGE.AUTH.SUCCESS.LOGIN_SUCCESSFUL,
          token,
        };
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
        return { success: false, message: MESSAGE.USER.ERROR.DUPLICATE_ENTRY };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.usersService.create({
        ...payload,
        password: hashedPassword,
      });

      if (newUser?.success && newUser?.data?.id != undefined) {
        const res = await this.otpService.create(newUser?.data?.id, 'VERIFY');
        if (res) {
          return {
            success: true,
            message: MESSAGE.AUTH.SUCCESS.ACCOUNT_CREATED,
            data: { data: newUser.data, code: res.data?.code },
          };
        } else {
          return false;
        }
      }
    } catch (error) {
      return { success: false, message: MESSAGE.USER.ERROR.DATABASE_ERROR };
    }
  }

  async verify(userId: number, code: string) {
    try {
      const otp = await this.otpService.findByUserId(userId);
      if (!otp) {
        return { message: MESSAGE.AUTH.ERROR.USER_NOT_FOUND };
      }
      if (otp?.data?.code !== code) {
        return { message: MESSAGE.AUTH.ERROR.PASSWORD_RESET_INVALID };
      }
      if (isExpired(otp?.data?.expireAt as Date)) {
        return { message: MESSAGE.AUTH.ERROR.PASSWORD_RESET_EXPIRED };
      }
      await this.otpService.remove(otp?.data?.id as number);
      await this.usersService.updateOneById(userId, { isVerified: true });
      return {
        success: true,
        message: MESSAGE.AUTH.SUCCESS.ACCOUNT_ACTIVATED,
      };
    } catch (error) {
      Logger.error(`Error during forgot password: ${error.message}`);
      return { success: false, message: MESSAGE.AUTH.ERROR.USER_NOT_FOUND };
    }
  }

  async forgotPassword(payload: ForgotPasswordDto) {
    try {
      const { email } = payload;
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        throw new UnauthorizedException(MESSAGE.AUTH.ERROR.USER_NOT_FOUND);
      }
      Logger.log(MESSAGE.AUTH.SUCCESS.PASSWORD_RESET_LINK_SENT);
      return {
        success: true,
        message: MESSAGE.AUTH.SUCCESS.PASSWORD_RESET_LINK_SENT,
      };
    } catch (error) {
      Logger.error(`Error during forgot password: ${error.message}`);
      return { success: false, message: MESSAGE.AUTH.ERROR.USER_NOT_FOUND };
    }
  }

  async resetPassword(payload: ResetPasswordDto) {
    try {
      const { email, newPassword } = payload;
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        Logger.error(MESSAGE.AUTH.ERROR.USER_NOT_FOUND);
        throw new UnauthorizedException(MESSAGE.AUTH.ERROR.USER_NOT_FOUND);
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.usersService.updateOneById(user?.data?.id as number, {
        password: hashedPassword,
      });
      Logger.log(MESSAGE.AUTH.SUCCESS.PASSWORD_RESET_CONFIRMED);
      return {
        success: true,
        message: MESSAGE.AUTH.SUCCESS.PASSWORD_RESET_CONFIRMED,
      };
    } catch (error) {
      Logger.error(`Error during password reset: ${error.message}`);
      return {
        success: false,
        message: MESSAGE.AUTH.ERROR.PASSWORD_RESET_INVALID,
      };
    }
  }
}
