export const isFieldValidNumber = (field: any) =>
  typeof field === 'number' && !Number.isNaN(field);
