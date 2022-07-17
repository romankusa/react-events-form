import { screen, waitFor } from '@testing-library/react';

export const expectText = async (text: string) => {
  await waitFor(() => {
    expect(screen.getByText(text)).toBeInTheDocument();
  });
};
