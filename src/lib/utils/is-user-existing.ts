import { db } from '@/lib/db';

export const isUserExistingByLogin = (login: string) =>
  !!db.users.find((user) => user.login === login);

export const isUserExistingById = (id: string) =>
  !!db.users.find((user) => user.id === id);
