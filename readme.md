# React Events Form

React Events Form is a small and simple library for handling forms on React.

### How It Works - Respect The Re-renders

This form is strictly events based, that means, it will never cause a re-render in your component.

All the data of your form will be save on useRefs and never useState or useReducer.

With this basic implementation, you can use our default components to re-render your components (ex:
display error messages), or create your own custom components.

For updating your component, you can subscribe to different field or form events.

### Installation

Install command

```sh
npm install --save react-events-form
```

### Example

```js
import React from 'react';
import { useForm } from 'react-events-form';

export const BasicForm = ({ onSuccess = () => {} }) => {
  const { handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSuccess)}>
      <input {...register('name')} type="text" />
    </form>
  );
};
```

# Docs

## With Errors

For displaying errors, you need to subscribe to the error change event of the field.

```js
import React, { useEffect, useState } from 'react';
import { useForm, errorChangeEvent } from 'react-events-form';

export const BasicForm = ({ onSuccess = () => {} }) => {
  const { register, handleSubmit, subscribe } = useForm();
  const [error, setError] = useState();

  useEffect(() => {
    return subscribe(errorChangeEvent('name'), setError);
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
      {error && <p>{error}</p>}
    </form>
  );
};
```

## Errors With Custom Components

Of course you don't want to re-write that logic for every form of your application, that's why is
recommend to use reusable components for updating the inputs.

What the `Field` component does, is subscribe to form events, and pass those props to the field.

`Input.tsx`

```js
import React from 'react';

export const Input = ({ errorMessage, ...props }: any) => {
  return (
    <div>
      <input {...props} />
      {errorMessage}
    </div>
  );
};
```

`Form.tsx`

```js
import React from 'react';
import { Field, Form, FormProvider } from 'react-events-form';
import { Input } from './Input';

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
        <Field>
          <Input
            name="email"
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
```

## Contributors

- [@romankusinsky](https://romankusinsky.netlify.app/)
