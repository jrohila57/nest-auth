import { Inject, Injectable, Logger } from '@nestjs/common';
import { OTP_REPOSITORY } from '@/core/constant';
import { Otp } from './otp.entity';
import MESSAGE from '@/core/constant/messages';

@Injectable()
export class OtpService {
  constructor(
    @Inject(OTP_REPOSITORY) private readonly otpRepository: typeof Otp,
  ) {}

  async create(userId: number, type: string) {
    try {
      const code: string = '12432352';
      const now = new Date();
      const expireAt = new Date(now.getTime() + 10 * 60000);
      const payload: any = {
        userId,
        type,
        code,
        expireAt,
      };
      const otp = await this.otpRepository.create(payload);
      Logger.log('OTP created successfully');
      return {
        success: true,
        message: MESSAGE.OTP.SUCCESS.OTP_SENT,
        data: otp,
      };
    } catch (error) {
      Logger.error('Failed to create OTP', error.stack);
      return {
        success: false,
        message: MESSAGE.OTP.ERROR.OTP_VERIFICATION_PENDING,
        error: error.message,
      };
    }
  }

  async findByUserId(userId: number) {
    try {
      const otp = await this.otpRepository.findOne({ where: { userId } });
      if (!otp) {
        Logger.warn(`OTP not found for user ${userId}`);
        return { success: false, message: MESSAGE.OTP.ERROR.OTP_NOT_FOUND };
      }
      Logger.log('OTP found successfully');
      return {
        success: true,
        message: MESSAGE.OTP.SUCCESS.OTP_SENT,
        data: otp,
      };
    } catch (error) {
      Logger.error('Failed to find OTP', error.stack);
      return {
        success: false,
        message: MESSAGE.OTP.ERROR.OTP_NOT_FOUND,
        error: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const deletedRowsCount = await this.otpRepository.destroy({
        where: { id },
      });
      if (deletedRowsCount === 0) {
        Logger.warn(`OTP with ID ${id} not found for deletion`);
        return {
          success: false,
          message: MESSAGE.OTP.ERROR.OTP_NOT_FOUND,
        };
      }
      Logger.log(`OTP deleted successfully: ${id}`);
      return {
        success: true,
        message: MESSAGE.OTP.SUCCESS.OTP_VERIFICATION_COMPLETE,
      };
    } catch (error) {
      Logger.error('Failed to delete OTP', error.stack);
      return {
        success: false,
        message: MESSAGE.OTP.ERROR.OTP_SENDING_DISABLED,
        error: error.message,
      };
    }
  }
}
