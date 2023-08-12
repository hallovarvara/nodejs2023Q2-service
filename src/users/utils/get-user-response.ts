import { User } from '@/users/user.entity';

export const getUserResponse = (user: User): Omit<User, 'password'> =>
  Object.entries(user).reduce(
    (result, [key, value]) =>
      key === 'password' ? result : { ...result, [key]: value },
    {} as Omit<User, 'password'>,
  );
