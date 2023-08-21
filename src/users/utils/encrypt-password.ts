import { randomBytes, scrypt as _scrypt } from 'crypto';
import * as dotenv from 'dotenv';
import { promisify } from 'util';

dotenv.config();

const scrypt = promisify(_scrypt);

const SEPARATOR = '_-_';

const getHash = async ({ password, salt }) =>
  ((await scrypt(password, salt, 32)) as Buffer).toString('hex');

export const encryptPassword = async (password: string) => {
  const salt = randomBytes(+(process.env.CRYPT_SALT || 10)).toString('hex');
  const hash = await getHash({ password, salt });
  return salt + SEPARATOR + hash;
};

export const arePasswordsMatch = async ({
  password,
  storedPassword,
}: {
  password: string;
  storedPassword: string;
}) => {
  const [salt, storedHash] = storedPassword.split(SEPARATOR);
  const hash = await getHash({ password, salt });
  return hash === storedHash;
};
