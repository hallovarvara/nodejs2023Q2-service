import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = +process.env.PORT || 4000;

export const UUID_VERSION = '4';

export const IS_PUBLIC_KEY = 'isPublic';

const JWT_SECRET_KEY_DEFAULT = 'secret123123';

export const JWT_SECRET_KEY =
  process.env.JWT_SECRET_KEY || JWT_SECRET_KEY_DEFAULT;

export const JWT_SECRET_REFRESH_KEY =
  process.env.JWT_SECRET_REFRESH_KEY || JWT_SECRET_KEY_DEFAULT;

export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1h';

export const TOKEN_REFRESH_EXPIRE_TIME =
  process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';

export const LOG_DIRECTORY = 'logs';

export const LOG_LEVEL = +process.env.LOG_LEVEL || 1;

const BYTES_IN_KB = 1000;

export const LOG_MAX_FILE_SIZE =
  (+process.env.LOG_MAX_FILE_SIZE_KB || 10000) * BYTES_IN_KB;
