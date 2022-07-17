import React from 'react';
import { Field } from '../Field';
import { Form } from '../Form';
import { Input } from './Input';
import { FormProvider } from '../../context';

export const CBasicForm = ({ onSuccess = () => {} }) => {
  return (
    <FormProvider>
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
      </Form>
    </FormProvider>
  );
};
