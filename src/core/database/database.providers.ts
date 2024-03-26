import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { DATABASE, SEQUELIZE } from '../constant';
import { Logger } from '@nestjs/common';
import configuration from '../config/configuration';
import { Users } from '@/modules/users/user.entity';
import { Otp } from '@/modules/otp/otp.entity';
import MESSAGE from '../constant/messages';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      try {
        const config: SequelizeOptions = configuration().database;
        const sequelize = new Sequelize(config);
        sequelize.addModels([Users, Otp]);
        await sequelize.authenticate({ logging: true });
        await sequelize.sync();
        Logger.log(MESSAGE.USER.SUCCESS.DATA_RETRIEVED, DATABASE);
        return sequelize;
      } catch (error: any) {
        Logger.error(MESSAGE.USER.ERROR.DATABASE_ERROR, error);
      }
    },
  },
];
