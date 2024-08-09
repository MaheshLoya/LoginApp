import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login';

test('renders login form', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
});

test('navigates to home on successful login', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'test' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'test' } });
  fireEvent.click(screen.getByRole('button', { name: /Login/i }));

  // You can mock navigate and check if it's called
});
