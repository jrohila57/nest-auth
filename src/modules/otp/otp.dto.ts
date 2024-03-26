import { IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { Otp } from './otp.entity';
import { Type } from '@/core/constant/enum';

export class CreateOtpDto extends Otp {
  @IsNotEmpty()
  @IsInt()
  readonly userId: number;

  @IsEnum(Type)
  readonly type: string;
}
