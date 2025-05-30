import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button.jsx';

// Mock del componente Icon
jest.mock('../Icon/Icon.jsx', () => {
  return function MockIcon({ name, className }) {
    return <span data-testid="mock-icon" className={className}>{name}</span>;
  };
});

// Mock del componente Text
jest.mock('../Text/Text.jsx', () => {
  return function MockText({ children, className }) {
    return <span data-testid="mock-text" className={className}>{children}</span>;
  };
});

describe('Button Component', () => {
  // ===== TESTS BÁSICOS =====
  test('renders without crashing', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByTestId('Button')).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('applies default props correctly', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('font-medium'); // Base class
  });

  // ===== TESTS DE VARIANTES =====
  test('applies different variants correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('from-indigo-600');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('from-gray-600');

    rerender(<Button variant="success">Success</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('from-green-600');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('from-red-600');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('border-2');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('text-indigo-600');
  });

  test('applies game variants correctly', () => {
    const { rerender } = render(<Button variant="gameReveal">Reveal</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('bg-white');

    rerender(<Button variant="gameCorrect">Correct</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('bg-green-600');

    rerender(<Button variant="gameIncorrect">Incorrect</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('bg-red-600');
  });

  // ===== TESTS DE TAMAÑOS =====
  test('applies different sizes correctly', () => {
    const { rerender } = render(<Button size="xs">Extra Small</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('px-2');

    rerender(<Button size="small">Small</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('px-3');

    rerender(<Button size="medium">Medium</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('px-4');

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('px-6');

    rerender(<Button size="xlarge">Extra Large</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('px-8');

    rerender(<Button size="game">Game</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('py-[15px]');
  });

  // ===== TESTS DE ICONOS =====
  test('renders with icon correctly', () => {
    render(<Button icon="heart">With Icon</Button>);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveTextContent('heart');
  });

  test('applies different icon positions correctly', () => {
    const { rerender } = render(
        <Button icon="heart" iconPosition="left">Left Icon</Button>
    );
    expect(screen.getByTestId('Button')).toHaveClass('gap-2');

    rerender(<Button icon="heart" iconPosition="right">Right Icon</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('gap-2');
  });

  test('renders only icon when no children provided', () => {
    render(<Button icon="heart" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-text')).not.toBeInTheDocument();
  });

  // ===== TESTS DE ESTADOS =====
  test('applies loading state correctly', () => {
    render(<Button loading={true}>Loading Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button).toHaveClass('cursor-wait');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByTestId('mock-icon')).toHaveTextContent('spinner');
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('applies disabled state correctly', () => {
    render(<Button disabled={true}>Disabled Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('applies fullWidth correctly', () => {
    render(<Button fullWidth={true}>Full Width</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('w-full');
  });

  // ===== TESTS DE ELEMENTOS HTML =====
  test('renders as different HTML elements', () => {
    const { rerender } = render(<Button as="button">Button Element</Button>);
    expect(screen.getByTestId('Button').tagName).toBe('BUTTON');

    rerender(<Button as="a" href="/test">Link Element</Button>);
    const linkElement = screen.getByTestId('Button');
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', '/test');

    rerender(<Button as="div">Div Element</Button>);
    expect(screen.getByTestId('Button').tagName).toBe('DIV');
  });

  test('handles link props correctly', () => {
    render(<Button as="a" href="/test" target="_blank">Link Button</Button>);
    const link = screen.getByTestId('Button');

    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveAttribute('target', '_blank');
  });

  // ===== TESTS DE EVENTOS =====
  test('handles click events correctly', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);

    fireEvent.click(screen.getByTestId('Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not trigger click when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled={true}>Disabled</Button>);

    fireEvent.click(screen.getByTestId('Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('does not trigger click when loading', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} loading={true}>Loading</Button>);

    fireEvent.click(screen.getByTestId('Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('handles mouse events correctly', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();

    render(
        <Button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
          Hover Button
        </Button>
    );

    const button = screen.getByTestId('Button');

    fireEvent.mouseEnter(button);
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(button);
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);
  });

  test('handles focus events correctly', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(
        <Button
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
          Focus Button
        </Button>
    );

    const button = screen.getByTestId('Button');

    fireEvent.focus(button);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(button);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // ===== TESTS DE TIPOS DE BOTÓN =====
  test('applies different button types correctly', () => {
    const { rerender } = render(<Button type="button">Button Type</Button>);
    expect(screen.getByTestId('Button')).toHaveAttribute('type', 'button');

    rerender(<Button type="submit">Submit Type</Button>);
    expect(screen.getByTestId('Button')).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">Reset Type</Button>);
    expect(screen.getByTestId('Button')).toHaveAttribute('type', 'reset');
  });

  // ===== TESTS DE CLASES PERSONALIZADAS =====
  test('applies custom className correctly', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('custom-class');
  });

  test('combines classes correctly', () => {
    render(
        <Button
            variant="primary"
            size="large"
            fullWidth={true}
            className="custom-class"
        >
          Combined Classes
        </Button>
    );

    const button = screen.getByTestId('Button');
    expect(button).toHaveClass('from-indigo-600'); // variant
    expect(button).toHaveClass('px-6'); // size
    expect(button).toHaveClass('w-full'); // fullWidth
    expect(button).toHaveClass('custom-class'); // custom
  });

  // ===== TESTS DE EDGE CASES =====
  test('handles empty children gracefully', () => {
    render(<Button></Button>);
    expect(screen.getByTestId('Button')).toBeInTheDocument();
  });

  test('handles null children gracefully', () => {
    render(<Button>{null}</Button>);
    expect(screen.getByTestId('Button')).toBeInTheDocument();
  });

  test('handles complex children content', () => {
    render(
        <Button>
          <span>Complex</span>
          <strong>Content</strong>
        </Button>
    );

    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  // ===== TESTS DE ACCESIBILIDAD =====
  test('has proper accessibility attributes', () => {
    render(<Button>Accessible Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button).toHaveAttribute('data-testid', 'Button');
    expect(button).not.toHaveAttribute('aria-disabled', 'true');
  });

  test('maintains accessibility when disabled', () => {
    render(<Button disabled={true}>Disabled Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toBeDisabled();
  });

  test('maintains accessibility when loading', () => {
    render(<Button loading={true}>Loading Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  // ===== TESTS DE COMBINACIONES COMPLEJAS =====
  test('handles complex combinations correctly', () => {
    render(
        <Button
            variant="gameCorrect"
            size="game"
            icon="check"
            iconPosition="left"
            fullWidth={true}
            onClick={() => {}}
            className="custom-game-button"
        >
          ¡CORRECTO!
        </Button>
    );

    const button = screen.getByTestId('Button');
    expect(button).toHaveClass('bg-green-600'); // gameCorrect variant
    expect(button).toHaveClass('py-[15px]'); // game size
    expect(button).toHaveClass('w-full'); // fullWidth
    expect(button).toHaveClass('custom-game-button'); // custom class
    expect(screen.getByTestId('mock-icon')).toHaveTextContent('check');
    expect(screen.getByText('¡CORRECTO!')).toBeInTheDocument();
  });
});
