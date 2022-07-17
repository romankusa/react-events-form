import { checkFormError } from './utils/checkFormError';

export type FormErrorsKeys = keyof typeof checkFormError;

export type FormStateType = {
  [name: string]: any;
};

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

export interface UseFormOptions {
  validateOnBlur?: boolean;
}
