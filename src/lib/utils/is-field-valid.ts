export const isFieldValid = (field: any) =>
  field && typeof field === 'string' && field.length > 0;
