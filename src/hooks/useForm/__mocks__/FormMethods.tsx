import React, { useEffect, useState } from 'react';
import { useForm } from '../useForm';
import { FormEvents } from '../utils/constants';
import { errorChangeEvent } from '../utils/errorChangeEvent';
import { valueSetEvent } from '../utils/valueSetEvent';

export const FormMethods = ({
  onSuccess = () => {},
  resetFormCb = () => {},
  inputChangeCb = () => {},
  stateChangeCb = () => {},
  getStateCb = (state: any) => {},
  getErrorCb = (error: any) => {},
  valueSetCb = (value: any) => {},
  errorChangeCb = (error: any) => {},
}) => {
  const {
    register,
    handleSubmit,
    subscribe,
    resetForm,
    getState,
    validateForm,
    setValue,
    setError,
    getError,
    validateField,
  } = useForm();

  useEffect(() => {
    const unsub1 = subscribe(FormEvents.RESET_FORM, resetFormCb);
    const unsub2 = subscribe(FormEvents.INPUT_CHANGE, inputChangeCb);
    const unsub3 = subscribe(FormEvents.STATE_CHANGE, stateChangeCb);
    const unsub4 = subscribe(errorChangeEvent('name'), errorChangeCb);
    const unsub5 = subscribe(valueSetEvent('name'), valueSetCb);

    return () => {
      unsub1();
      unsub2();
      unsub3();
      unsub4();
      unsub5();
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSuccess)}>
      <input
        {...register('name', {
          errors: {
            required: 'This field is required',
          },
        })}
        type="text"
      />
      <button onClick={resetForm}>resetForm</button>
      <button onClick={() => getStateCb(getState())}>getState</button>
      <button onClick={validateForm}>validateForm</button>
      <button onClick={() => setValue('name', 'new value')}>setValue</button>
      <button onClick={() => setError('name', 'new error')}>setError</button>
      <button onClick={() => getErrorCb(getError('name'))}>getError</button>
      <button onClick={() => validateField('name')}>validateField</button>
    </form>
  );
};
