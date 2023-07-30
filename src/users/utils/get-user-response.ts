import { UserResponseT, UserT } from '../users.type';

export const getUserResponse = (user: UserT): UserResponseT =>
  Object.entries(user).reduce(
    (result, [key, value]) =>
      key === 'password' ? result : { ...result, [key]: value },
    {} as UserResponseT,
  );
