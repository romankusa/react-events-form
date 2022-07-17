import { waitFor } from '@testing-library/react';

export const expectFnToHaveBeenCalledWith = async (fn: jest.Mock<any, any>, value: any) => {
  await waitFor(() => {
    expect(fn).toHaveBeenCalledWith(value);
  });
};
