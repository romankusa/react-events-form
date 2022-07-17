import React from 'react';
import { Field } from '../Field';
import { Form } from '../Form';
import { Input } from './Input';
import { FormProvider } from '../../context';

export const CFormWithDefaultValue = ({ onSuccess = () => {} }) => {
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
            defaultValue="This is a default value"
          />
        </Field>
      </Form>
    </FormProvider>
  );
};
