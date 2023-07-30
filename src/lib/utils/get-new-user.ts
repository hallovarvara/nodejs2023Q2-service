import { CreateUserDtoT, UserT } from '@/users/users.type';
import { v4 } from 'uuid';

export const getNewUser = ({ login, password }: CreateUserDtoT): UserT => {
  const timestampNow = new Date().getTime();

  return {
    login,
    password,
    id: v4(),
    createdAt: timestampNow,
    updatedAt: timestampNow,
    version: 1,
  };
};
