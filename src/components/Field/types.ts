import { FormErrorsType } from '../../hooks/useForm/types';

export interface FieldChild {
  name: string;
  value?: any;
  defaultValue?: any;
  defaultChecked?: boolean;
  errors?: FormErrorsType;
  errorMessage?: string;
  onChange?: (event: string | React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (() => void) | undefined;
}
