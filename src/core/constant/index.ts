import { LoggerService, LogLevel } from '@nestjs/common';

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
