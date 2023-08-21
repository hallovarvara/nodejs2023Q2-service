import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;

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
