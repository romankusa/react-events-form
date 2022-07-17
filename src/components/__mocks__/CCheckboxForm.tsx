import React from 'react';
import { Field } from '../Field';
import { Form } from '../Form';
import { Input } from './Input';
import { FormProvider } from '../../context';

export const CCheckboxForm = ({ onSuccess = () => {} }) => {
  return (
    <FormProvider>
      <Form onSuccess={onSuccess}>
        <Field type="checkbox">
          <Input name="checkboxName" type="checkbox" />
        </Field>
      </Form>
    </FormProvider>
  );
};
