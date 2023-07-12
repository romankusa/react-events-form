import { ChangeEvent } from 'react';
import { checkFormError } from './utils/checkFormError';

export type FormErrorsKeys = keyof typeof checkFormError;

export type FormStateType = Record<string, any>;

export type ValidateFunction = (inputValue: string) => string | undefined;

export type FormErrorsType = {
  [key in FormErrorsKeys | 'validate']?:
    | string
    | [any, string]
    | ValidateFunction
    | ValidateFunction[];
};

export type RegisterPropsTypes = 'radio' | 'checkbox';

export type RegisterProps = {
  errors?: FormErrorsType;
  defaultValue?: any;
  value?: string;
  defaultChecked?: boolean;
  type?: RegisterPropsTypes;
};

export type RegisteredFieldProps = {
  name: string;
  onChange: (event: string | ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  value?: any;
  defaultValue?: any;
  defaultChecked?: boolean;
};

export interface UseFormOptions {
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  clearErrorOnChange?: boolean;
}
