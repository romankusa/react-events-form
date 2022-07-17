import { FormStateType } from '../types';

export const hasValueChanged = (state: FormStateType, name: string, newValue?: any) => {
  const prevValue = state && state[name];

  return JSON.stringify(prevValue) !== JSON.stringify(newValue);
};
