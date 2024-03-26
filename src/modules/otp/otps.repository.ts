import { OTP_REPOSITORY } from '@/core/constant';
import { Otp } from './otp.entity';

export const otpsRepository = [
  {
    provide: OTP_REPOSITORY,
    useValue: Otp,
  },
];
