import { UserT } from '@/users/users.type';

type DatabaseT = {
  users: UserT[];
};

export const db: DatabaseT = {
  users: [],
};
