import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { DATABASE, SEQUELIZE } from '../constant';
import { Logger } from '@nestjs/common';
import configuration from '../config/configuration';
import { Users } from '@/modules/users/user.entity';
import { MESSAGES } from '../constant/messages';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      try {
        const config: SequelizeOptions = configuration().database;
        const sequelize = new Sequelize(config);
        sequelize.addModels([Users]);
        await sequelize.authenticate({ logging: true });
        await sequelize.sync();
        Logger.log(MESSAGES.CONNECTION_ESTABLISHED, DATABASE);
        return sequelize;
      } catch (error: any) {
        Logger.error(MESSAGES.UNABLE_TO_CONNECT, error);
      }
    },
  },
];
