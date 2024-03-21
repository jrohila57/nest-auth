import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { SEQUELIZE } from '../constant';
import { Logger } from '@nestjs/common';
import configuration from '../config/configuration';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      try {
        const config: SequelizeOptions = configuration().database;
        const sequelize = new Sequelize(config);
        sequelize.addModels([]);
        await sequelize.authenticate();
        await sequelize.sync();
        Logger.log('Connection has been established successfully.', 'DATABASE');
        return sequelize;
      } catch (error: any) {
        Logger.error('Unable to connect to the database:', error);
      }
    },
  },
];
