import { formatDateParam } from '@/logging/utils/format-date-param';

export const getCurrentDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = formatDateParam(date.getMonth() + 1);
  const day = formatDateParam(date.getDate());
  const hours = formatDateParam(date.getHours());
  const minutes = formatDateParam(date.getMinutes());
  const seconds = formatDateParam(date.getSeconds());
  return `${year}-${month}-${day} (${hours}:${minutes}:${seconds})`;
};
