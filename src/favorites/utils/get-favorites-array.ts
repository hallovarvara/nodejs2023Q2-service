export const getFavoritesArray = <T>(value: T[]) =>
  Array.isArray(value) ? value : [];
