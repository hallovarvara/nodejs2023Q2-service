export const normalizeUser = (user) =>
  user === null
    ? user
    : {
        ...user,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      };
