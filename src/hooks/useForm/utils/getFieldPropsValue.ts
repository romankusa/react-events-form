import { RegisterPropsTypes } from '../types';

export const getFieldPropsValue = (
  defaultValue?: any,
  defaultChecked?: boolean,
  value?: string,
  type?: RegisterPropsTypes,
) => {
  let currentValue = defaultValue || defaultChecked;

  if (type === 'radio' && defaultChecked) currentValue = value;

  return currentValue;
};
