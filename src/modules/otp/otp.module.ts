import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { otpsRepository } from './otps.repository';

@Module({
  providers: [OtpService, ...otpsRepository],
  exports: [OtpService],
})
export class OtpModule {}
