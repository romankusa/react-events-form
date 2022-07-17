import { FormErrorsType } from '../../hooks/useForm/types';

export interface FormChildProps {
  name: string;
  value?: any;
  defaultValue?: any;
  defaultChecked?: boolean;
  errors?: FormErrorsType;
}
