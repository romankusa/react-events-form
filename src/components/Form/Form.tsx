import React, { FC, FormHTMLAttributes, ReactNode } from 'react';
import { useFormContext } from '../../context/FormContext/FormProvider';
import { FormStateType } from '../../hooks/useForm/types';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSuccess?: (state: FormStateType) => void;
  onError?: (state: FormStateType) => void;
}

export const Form: FC<FormProps> = ({ children, onSuccess, onError, ...props }) => {
  const { handleSubmit } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSuccess, onError)} {...props}>
      {children}
    </form>
  );
};
