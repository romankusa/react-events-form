import React, { useEffect } from 'react';
import { Field } from '../Field';
import { Form } from '../Form';
import { Input } from './Input';
import { useFormContext } from '../../context';
import { errorChangeEvent, FormEvents, valueSetEvent } from '../../hooks';

export const CFormMethods = ({
  onSuccess = () => {},
  resetFormCb = () => {},
  stateChangeCb = () => {},
  getStateCb = (state: any) => {},
  getErrorCb = (error: any) => {},
  valueSetCb = (value: any) => {},
  errorChangeCb = (error: any) => {},
}) => {
  const {
    subscribe,
    resetForm,
    getState,
    validateForm,
    setValue,
    setError,
    getError,
    validateField,
  } = useFormContext();

  useEffect(() => {
    const unsub1 = subscribe(FormEvents.RESET_FORM, resetFormCb);
    const unsub3 = subscribe(FormEvents.STATE_CHANGE, stateChangeCb);
    const unsub4 = subscribe(errorChangeEvent('name'), errorChangeCb);
    const unsub5 = subscribe(valueSetEvent('name'), valueSetCb);

    return () => {
      unsub1();
      unsub3();
      unsub4();
      unsub5();
    };
  }, []);

  return (
    <Form onSuccess={onSuccess}>
      <Field>
        <Input
          name="name"
          type="text"
          errors={{
            required: 'This field is required',
          }}
        />
      </Field>
      <button onClick={resetForm}>resetForm</button>
      <button onClick={() => getStateCb(getState())}>getState</button>
      <button onClick={validateForm}>validateForm</button>
      <button onClick={() => setValue('name', 'new value')}>setValue</button>
      <button onClick={() => setError('name', 'new error')}>setError</button>
      <button onClick={() => getErrorCb(getError('name'))}>getError</button>
      <button onClick={() => validateField('name')}>validateField</button>
    </Form>
  );
};
