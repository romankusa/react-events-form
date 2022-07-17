import { fireEvent } from '@testing-library/react';

export const submit = (selector: string) =>
  fireEvent.submit(document.querySelector(selector) as HTMLFormElement);
