export const checkFormError = {
  required: (value?: string) => !value || value === "",
  maxLength: (value: string, max?: number) => value.length > (max || 5000),
};
