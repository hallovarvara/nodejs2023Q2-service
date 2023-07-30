import { IdT } from '@/lib/types';

export type UserT = {
  id: IdT; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
};

export type CreateUserDtoT = Pick<UserT, 'login' | 'password'>;

export type UpdatePasswordDtoT = {
  oldPassword: UserT['password'];
  newPassword: UserT['password'];
};

export type UserResponseT = Omit<UserT, 'password'>;
