import React from 'react';
import { useForm } from '../useForm';

export const CheckboxForm = ({ onSuccess = () => {} }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSuccess)}>
      <input {...register('checkboxName')} type="checkbox" />
    </form>
  );
};
