import React from 'react';

export const Input = ({ errorMessage, ...props }: any) => {
  return (
    <div>
      <input {...props} />
      {errorMessage}
    </div>
  );
};
