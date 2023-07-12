import React, { useState } from 'react';
import { Field } from '../Field';
import { Form } from '../Form';
import { Input } from './Input';

export const DefaulValueChange = ({ onSuccess = () => {} }) => {
  const [defaultValue, setDefaultValue] = useState('');

  return (
    <Form onSuccess={onSuccess}>
      <Field>
        <Input
          name="name"
          type="text"
          errors={{
            required: 'This field is required',
          }}
          defaultValue={defaultValue}
        />
      </Field>
      <button type="button" onClick={() => setDefaultValue('value')}>
        update
      </button>
    </Form>
  );
};
