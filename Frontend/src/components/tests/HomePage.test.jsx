import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from '../HomePage';

test('renders home page', () => {
  render(<HomePage />);
  expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  expect(screen.getByText(/Welcome to the home page!/i)).toBeInTheDocument();
});
