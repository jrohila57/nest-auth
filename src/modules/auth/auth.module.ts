import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { OtpService } from '../otp/otp.service';
import { otpsRepository } from '../otp/otps.repository';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '200000s' },
    }),
  ],
  providers: [AuthService, OtpService, ...otpsRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
