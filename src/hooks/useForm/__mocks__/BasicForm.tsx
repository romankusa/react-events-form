import React, { useEffect, useState } from 'react';
import { useForm } from '../useForm';
import { errorChangeEvent } from '../utils/errorChangeEvent';

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
