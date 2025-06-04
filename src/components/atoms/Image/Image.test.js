import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Image from './Image.jsx';

describe('Image Component', () => {
  test('renderiza imagen básica', () => {
    render(<Image src="test.jpg" alt="Test image" />);
    const image = screen.getByTestId('Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  test('aplica dimensiones en píxeles', () => {
    render(<Image src="test.jpg" w={200} h={150} />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveStyle('width: 200px');
    expect(image).toHaveStyle('height: 150px');
  });

  test('aplica dimensiones en porcentaje', () => {
    render(<Image src="test.jpg" w={50} wType="%" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveStyle('width: 50%');
  });

  test('aplica diferentes tipos de unidades', () => {
    render(<Image src="test.jpg" w={10} h={5} wType="em" hType="rem" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveStyle('width: 10em');
    expect(image).toHaveStyle('height: 5rem');
  });

  test('maneja evento onClick', async () => {
    const handleClick = jest.fn();
    render(<Image src="test.jpg" onClick={handleClick} />);

    const image = screen.getByTestId('Image');
    await userEvent.click(image);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('aplica className personalizada', () => {
    render(<Image src="test.jpg" className="custom-image" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image', 'custom-image');
  });
});
