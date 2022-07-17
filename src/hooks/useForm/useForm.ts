import { ChangeEvent, FormEvent, useCallback, useMemo, useRef } from 'react';
import { useEventEmitter } from '../useEventEmitter';
import {
  FormErrorsKeys,
  FormErrorsType,
  FormStateType,
  RegisterProps,
  UseFormOptions,
} from './types';
import { checkFormError } from './utils/checkFormError';
import { FormEvents } from './utils/constants';
import { errorChangeEvent } from './utils/errorChangeEvent';
import { hasValueChanged } from './utils/hasValueChanged';
import { valueChangeEvent } from './utils/valueChangeEvent';
import { valueSetEvent } from './utils/valueSetEvent';

type FormStateRef = { [fieldName: string]: any };
type ErrorRefType = { [inputName: string]: FormErrorsType | undefined };
type ErrorMessagesRefType = { [errorName: string]: string | undefined };

export const useForm = ({ validateOnBlur }: UseFormOptions = {}) => {
  const formStateRef = useRef<FormStateRef>({});
  const errorsRef = useRef<ErrorRefType>({});
  const errorMessagesRef = useRef<ErrorMessagesRefType>({});
  const { subscribe, dispatch } = useEventEmitter();

  const getChildErrors = useCallback((inputName: string) => {
    const errors = errorsRef.current[inputName];
    const inputValue = formStateRef.current[inputName] as string;
    let errorMessage: string | undefined;

    for (const errorName in errors) {
      const errorData = errors[errorName as FormErrorsKeys];
      const isErrorDataArray = Array.isArray(errorData);
      const checkErrorFn = checkFormError[errorName as FormErrorsKeys];
      const isValidateFunction =
        typeof errorData === 'function' || (isErrorDataArray && typeof errorData[0] === 'function');

      if (isValidateFunction) {
        const validateFunctions = isErrorDataArray ? errorData : [errorData];

        for (const validateFunction of validateFunctions) {
          const validateErrorMessage = validateFunction(inputValue);
          if (validateErrorMessage) {
            errorMessage = validateErrorMessage;
            break;
          }
        }
      } else if (checkErrorFn) {
        const hasError = isErrorDataArray
          ? checkErrorFn(inputValue, errorData[0])
          : checkErrorFn(inputValue);
        if (hasError)
          errorMessage = isErrorDataArray ? (errorData[1] as string) : (errorData as string);
      }

      if (errorMessage) {
        break;
      }
    }

    return errorMessage;
  }, []);

  const setError = useCallback(
    (name: string, errorMessage?: string) => {
      if (!hasValueChanged(errorMessagesRef.current, name, errorMessage)) return;

      errorMessagesRef.current = {
        ...errorMessagesRef.current,
        [name]: errorMessage,
      };

      dispatch(errorChangeEvent(name), errorMessage);
    },
    [dispatch],
  );

  const getError = useCallback((name: string) => errorMessagesRef.current[name], []);

  const handleInputChange = useCallback(
    (name: string) => (event: string | ChangeEvent<HTMLInputElement>) => {
      let inputValue: string | boolean | ChangeEvent<HTMLInputElement> = event;

      const isReactEvent = event && typeof event !== 'string' && event.type === 'change';
      if (isReactEvent) {
        if (event.persist) event.persist();
        inputValue =
          event.currentTarget.type === 'checkbox'
            ? event.currentTarget.checked
            : event.currentTarget.value;
      }

      if (!hasValueChanged(getState(), name, inputValue as string)) return;

      const newState = {
        ...formStateRef.current,
        [name]: inputValue,
      };
      formStateRef.current = newState;
      dispatch(valueChangeEvent(name), inputValue);
      dispatch(FormEvents.STATE_CHANGE, newState);
    },
    [dispatch],
  );

  const validateField = useCallback(
    (inputName: string) => {
      const errorMessage = getChildErrors(inputName);

      const clearErrorMessage = errorMessagesRef.current[inputName] && !errorMessage;
      if (errorMessage || clearErrorMessage) {
        setError(inputName, errorMessage as string);
      }

      return errorMessage;
    },
    [getChildErrors, setError],
  );

  const handleInputBlur = useCallback(
    (name: string) => () => {
      validateField(name);
    },
    [validateField],
  );

  const getState = useCallback(() => formStateRef.current, []);
  const getValue = useCallback((name: string) => getState()[name], [getState]);

  const setValue = useCallback(
    (name: string, value?: string) => {
      if (!hasValueChanged(getState(), name, value)) return;

      formStateRef.current = {
        ...formStateRef.current,
        [name]: value,
      };

      dispatch(valueSetEvent(name), value);
    },
    [dispatch, getState],
  );

  const validateForm = useCallback(() => {
    let hasErrors = false;

    for (const name in formStateRef.current) {
      const errorMessage = validateField(name);

      if (errorMessage) hasErrors = true;
    }

    return hasErrors;
  }, [validateField]);

  const resetForm = useCallback(() => {
    const newFormState: FormStateType = {};

    for (const field in formStateRef.current) {
      if (formStateRef.current[field]) {
        dispatch(valueChangeEvent(field), undefined);
      }
      if (errorMessagesRef.current[field]) {
        setError(field, undefined);
      }
      newFormState[field] = undefined;
    }

    formStateRef.current = newFormState;
    dispatch(FormEvents.RESET_FORM, newFormState);
  }, [dispatch]);

  const register = useCallback(
    (name: string, { errors, defaultValue, defaultChecked, type, value }: RegisterProps = {}) => {
      let currentValue = defaultValue || defaultChecked;

      if (type === 'radio' && defaultChecked) currentValue = value;

      const itWasRegistered = Object.keys(formStateRef.current).find(
        (fieldName) => fieldName === name,
      );

      if (!itWasRegistered) {
        formStateRef.current = {
          ...formStateRef.current,
          [name]: currentValue,
        };

        errorsRef.current = {
          ...errorsRef.current,
          [name]: errors,
        };
      }

      return {
        name,
        value,
        defaultValue,
        defaultChecked,
        onChange: handleInputChange(name),
        onBlur: validateOnBlur ? handleInputBlur(name) : undefined,
      };
    },
    [handleInputChange],
  );

  const handleSubmit = useCallback(
    (onSuccess?: (state: FormStateType) => void) => (e: FormEvent<HTMLFormElement>) => {
      {
        e.preventDefault();

        const hasErrors = validateForm();

        if (onSuccess && !hasErrors) onSuccess(getState());
      }
    },
    [validateForm, getState],
  );

  return useMemo(
    () => ({
      resetForm,
      getState,
      getValue,
      validateForm,
      subscribe,
      register,
      setValue,
      setError,
      getError,
      handleSubmit,
      validateField,
    }),
    [
      resetForm,
      getState,
      validateForm,
      subscribe,
      register,
      setValue,
      setError,
      getError,
      handleSubmit,
      validateField,
    ],
  );
};
