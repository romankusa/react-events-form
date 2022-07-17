import React from 'react';
import { Field } from '../Field';
import { Form } from '../Form';
import { Input } from './Input';

export const CValidateOnBlurForm = ({ onSuccess = () => {} }) => {
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
    </Form>
  );
};
