import { act, fireEvent, waitFor } from '@testing-library/react';

export const addInputValue = (selector: string, value: string) =>
  new Promise<void>(async (res) => {
    const input = document.querySelector(selector) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value } });
    });

    await waitFor(() => {
      expect(input.value).toBe(value);
    });

    res();
  });
