import { useEffect, useMemo, useState } from 'react';
import { FormChildProps } from '../components/Field';
import { useFormContext } from '../context/FormContext/FormProvider';
import { useForceUpdate } from './useForceUpdate';
import { RegisterPropsTypes } from './useForm/types';
import { errorChangeEvent } from './useForm/utils/errorChangeEvent';
import { valueSetEvent } from './useForm/utils/valueSetEvent';

interface UseFieldProps {
  childProps: FormChildProps;
  type?: RegisterPropsTypes;
}

export const useField = ({ childProps, type }: UseFieldProps) => {
  const { subscribe, register, getValue } = useFormContext();
  const { name, errors, defaultValue, defaultChecked, value } = childProps;
  const props = useMemo(
    () => register(name, { errors, defaultValue, defaultChecked, type, value }),
    [register],
  );
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [forceUpdate, forceUpdateValue] = useForceUpdate();
  const currentValue = getValue(name);

  useEffect(() => {
    const unsubscribeValue = subscribe(valueSetEvent(name), forceUpdate);
    const unsubscribeError = subscribe(errorChangeEvent(name), setErrorMessage);

    return () => {
      unsubscribeValue();
      unsubscribeError();
    };
  }, []);

  return useMemo(
    () => ({
      ...props,
      errorMessage,
      value: currentValue,
    }),
    [errorMessage, currentValue, forceUpdateValue],
  );
};
