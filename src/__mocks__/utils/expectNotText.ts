import { screen, waitFor } from '@testing-library/react';

export const expectNotText = async (text: string) => {
  await waitFor(() => {
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });
};
