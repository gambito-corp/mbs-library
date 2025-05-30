import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Animated from './Animated';

describe('<Animated />', () => {
  test('it should mount', () => {
    render(<Animated />);

    const animated = screen.getByTestId('Animated');

    expect(animated).toBeInTheDocument();
  });
});