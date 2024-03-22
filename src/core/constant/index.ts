import { LoggerService, LogLevel } from '@nestjs/common';

// Database Constants
export const SEQUELIZE = 'SEQUELIZE';
export const DATABASE = 'DATABASE';
export const USER_REPOSITORY = 'USER_REPOSITORY';

// Environment Constants
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';

// Logging Constants
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

// Gender Constants
export const MALE = 'male';
export const FEMALE = 'female';
export const OTHER = 'other';

// Role Constants
export const ADMIN = 'admin';
export const USER = 'user';
