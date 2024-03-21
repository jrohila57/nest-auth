import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { SEQUELIZE } from '../constant';
import { Logger } from '@nestjs/common';
import configuration from '../config/configuration';
import { Users } from '@/modules/users/entities/user.entity';

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
        Logger.log('Connection has been established successfully.', 'DATABASE');
        return sequelize;
      } catch (error: any) {
        Logger.error('Unable to connect to the database:', error);
      }
    },
  },
];
