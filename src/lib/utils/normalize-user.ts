export const normalizeUser = (user) => ({
  ...user,
  createdAt: user.createdAt.getTime(),
  updatedAt: user.updatedAt.getTime(),
});
