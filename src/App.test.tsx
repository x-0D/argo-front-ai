import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ArgoCD Dashboard title', () => {
  render(<App />);
  const titleElement = screen.getByText(/ArgoCD Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});