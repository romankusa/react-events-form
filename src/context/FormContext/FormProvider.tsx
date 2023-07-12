import React, { useContext, useMemo } from 'react';
import { createContext, FC, ReactNode } from 'react';
import { UseFormOptions, useForm } from '../../hooks';

export const FormContext = createContext({} as ReturnType<typeof useForm>);

type FormProviderProps = {
  children: ReactNode;
} & UseFormOptions;

export const FormProvider: FC<FormProviderProps> = ({ children, ...useFormOptions }) => {
  const contextValue = useMemo(() => useForm(useFormOptions), []);

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};

export const useFormContext = () => useContext(FormContext);
