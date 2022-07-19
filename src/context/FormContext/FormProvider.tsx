import React, { useContext } from 'react';
import { createContext, FC, ReactNode } from 'react';
import { UseFormOptions, useForm } from '../../hooks';

export const FormContext = createContext({} as ReturnType<typeof useForm>);

type FormProviderProps = {
  children: ReactNode;
} & UseFormOptions;

export const FormProvider: FC<FormProviderProps> = ({ children, ...useFormOptions }) => {
  return <FormContext.Provider value={useForm(useFormOptions)}>{children}</FormContext.Provider>;
};

export const useFormContext = () => useContext(FormContext);
