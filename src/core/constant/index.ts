import { LoggerService, LogLevel } from '@nestjs/common';
export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';
export const USER_REPOSITORY = 'USER_REPOSITORY';
export const LOG = 'log';
export const FATAL = 'fatal';
export const ERROR = 'error';
export const WARN = 'warn';
export const DEBUG = 'debug';

export const LOGGER: false | LoggerService | LogLevel[] | undefined = [
  LOG,
  FATAL,
  ERROR,
  WARN,
  DEBUG,
];
