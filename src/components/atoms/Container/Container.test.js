import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Container from './Container.jsx';

describe('Container Component', () => {
  test('renders without crashing', () => {
    render(<Container>Test content</Container>);
    expect(screen.getByTestId('Container')).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    render(
        <Container>
          <p>Test content</p>
        </Container>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('applies variant classes correctly', () => {
    const { rerender } = render(<Container variant="card">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('bg-white');

    rerender(<Container variant="panel">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('bg-gray-50');

    rerender(<Container variant="hero">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('bg-gradient-to-r');
  });

  test('applies size classes correctly', () => {
    const { rerender } = render(<Container size="small">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('max-w-sm');

    rerender(<Container size="large">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('max-w-lg');
  });

  test('applies centered class when centered prop is true', () => {
    render(<Container centered={true}>Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('mx-auto');
  });

  test('applies fluid width when fluid prop is true', () => {
    render(<Container fluid={true}>Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('w-full');
  });

  test('applies custom className', () => {
    render(<Container className="custom-class">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('custom-class');
  });

  test('renders as different HTML elements', () => {
    const { rerender } = render(<Container as="section">Content</Container>);
    expect(screen.getByRole('region')).toBeInTheDocument();

    rerender(<Container as="article">Content</Container>);
    expect(screen.getByRole('article')).toBeInTheDocument();

    rerender(<Container as="main">Content</Container>);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('applies padding classes correctly', () => {
    const { rerender } = render(<Container padding="small">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('p-2');

    rerender(<Container padding="large">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('p-6');
  });

  test('applies shadow classes correctly', () => {
    const { rerender } = render(<Container shadow="md">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('shadow-md');

    rerender(<Container shadow="xl">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('shadow-xl');
  });

  test('applies border classes correctly', () => {
    const { rerender } = render(<Container border="sm">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('border');

    rerender(<Container border="dashed">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('border-dashed');
  });

  test('applies rounded classes correctly', () => {
    const { rerender } = render(<Container rounded="md">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('rounded-md');

    rerender(<Container rounded="full">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('rounded-full');
  });

  test('applies background classes correctly', () => {
    const { rerender } = render(<Container background="white">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('bg-white');

    rerender(<Container background="primary">Content</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('bg-blue-500');
  });

  test('handles complex combinations of props', () => {
    render(
        <Container
            variant="card"
            size="large"
            centered={true}
            padding="large"
            shadow="lg"
            rounded="xl"
            border="sm"
        >
          Complex content
        </Container>
    );

    const container = screen.getByTestId('Container');
    expect(container).toHaveClass('bg-white'); // variant card
    expect(container).toHaveClass('max-w-lg'); // size large
    expect(container).toHaveClass('mx-auto'); // centered
    expect(container).toHaveClass('p-6'); // padding large
    expect(container).toHaveClass('shadow-lg'); // shadow lg
    expect(container).toHaveClass('rounded-xl'); // rounded xl
    expect(container).toHaveClass('border'); // border sm
  });
});
