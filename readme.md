# React Events Form

React Events Form is a small and simple library for handling forms on React.

### How It Works - Respect The Re-renders

This form is strictly events based, that means, it will never cause a re-render in your component.

All the data of your form will be save on `useRefs` and never `useState` or `useReducer`.

With this basic implementation, you can use our default components to re-render your components (ex:
display error messages), or create your own custom components.

For updating your component, you can subscribe to different field or form events.

### Installation

npm

```sh
npm install react-events-form
```

yarn

```sh
yarn add react-events-form
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

## useForm

useForm is the hook that creates your form. Internally it uses `useRef` and events to store and
manage your data.

### Options

- `validateOnBlur?: boolean`: It will validate the fields when a blur event occurs on them, by
  default it validates when the form is submitted.

### Return Values

- `register`: Registers the field on the form and returns properties to keep track of the changes.
- `subscribe`: Subscribe to form or field events. Remember to always unsubscribe when the component
  unmounts. Events:
  - `errorChangeEvent(name: string)`: When the error message of a field changes. Callback called
    with `string | undefined`.
  - `valueChangeEvent(name: string)`: When the value of a field changes. Callback called with
    `string | undefined`.
  - `valueSetEvent(name: string)`: When the value of a field was set using the `setValue` function.
    Callback called with `string | undefined`.
  - `FormEvents.STATE_CHANGE`: When the values of the state change. Callback called with the new
    state.
  - `FormEvents.RESET_FORM`: When the form has been reset. Callback called with the new state.
- `resetForm`: Sets the form values and errors to undefined. It sends the event
  `FormEvents.RESET_FORM`, and values or errors changes.
- `getState`: Returns the state of the form.
- `getValue`: Returns the value of the field.
- `validateForm` Validates all the fields and returns a boolean, `true` if the form has errors.
  Sends errors changes events.
- `setValue`: Sets the value of a field. Triggers only the `valueSetEvent`.
- `setError`: Sets the error of a field. Triggers `errorChangeEvent`.
- `getError`: Returs the error of a field.
- `handleSubmit`: Returns a function that receibes the form submit event, runs the `validateForm`
  function, and if successfull, calls the `onSuccess` callback.
- `validateField`: Validates a single field. Triggers `errorChangeEvent`.

# Examples

## Errors

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
import type { FieldChild } from 'react-events-form';

export const Input = ({ errorMessage, ...props }: FieldChild) => {
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

export const BasicForm = ({ onSuccess = () => {} }) => {
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
            type="email"
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

- [@romankusinsky](https://github.com/kusita8)
