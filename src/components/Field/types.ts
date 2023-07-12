import { FormErrorsType } from '../../hooks/useForm/types';

export interface FieldChild {
  name: string;
  value?: any;
  defaultValue?: any;
  defaultChecked?: boolean;
  errors?: FormErrorsType;
  errorMessage?: string;
  onChange?: (value?: any) => void;
  onBlur?: (() => void) | undefined;
}
