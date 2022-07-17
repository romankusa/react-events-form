import React from 'react';
import { useForm } from '../useForm';

export const RadioForm = ({ onSuccess = () => {} }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSuccess)}>
      <input
        {...register('radioName', {
          type: 'radio',
          value: 'Value 1',
          defaultChecked: true,
        })}
        type="radio"
      />
      <input
        {...register('radioName', {
          type: 'radio',
          value: 'Value 2',
        })}
        type="radio"
      />
    </form>
  );
};
