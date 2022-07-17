import React from 'react';
import { Field } from '../Field';
import { Form } from '../Form';
import { Input } from './Input';
import { FormProvider } from '../../context';

export const CRadioForm = ({ onSuccess = () => {} }) => {
  return (
    <FormProvider>
      <Form onSuccess={onSuccess}>
        <Field type="radio">
          <Input name="radioName" type="radio" value="Value 1" defaultChecked={true} />
        </Field>
        <Field type="radio">
          <Input name="radioName" type="radio" value="Value 2" />
        </Field>
      </Form>
    </FormProvider>
  );
};
