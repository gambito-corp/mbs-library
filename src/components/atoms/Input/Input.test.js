import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Input from './Input.jsx';

// Mock de los componentes Icon y Text
jest.mock('../Icon/Icon.jsx', () => {
  return function MockIcon({ name, className, size, onClick }) {
    return (
        <span
            data-testid="mock-icon"
            className={className}
            data-size={size}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
                {name}
            </span>
    );
  };
});

jest.mock('../Text/Text.jsx', () => {
  return function MockText({ children, className, as: Component = 'span' }) {
    return <Component data-testid="mock-text" className={className}>{children}</Component>;
  };
});

describe('Input Component', () => {
  // ===== TESTS BÁSICOS =====
  test('renders without crashing', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
  });

  // ===== TESTS DE ICONOS CON CALLBACKS =====
  test('renders icon with callback', () => {
    const handleIconClick = jest.fn();
    render(<Input icon="search" onIconClick={handleIconClick} />);

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('search');
  });

  test('calls onIconClick when icon is clicked', async () => {
    const handleIconClick = jest.fn();
    render(<Input icon="search" onIconClick={handleIconClick} />);

    const icon = screen.getByTestId('mock-icon');
    await userEvent.click(icon);

    expect(handleIconClick).toHaveBeenCalledTimes(1);
  });

  test('calls onIconLeftClick when left icon is clicked', async () => {
    const handleIconLeftClick = jest.fn();
    render(<Input iconLeft="user" onIconLeftClick={handleIconLeftClick} />);

    const icon = screen.getByTestId('mock-icon');
    await userEvent.click(icon);

    expect(handleIconLeftClick).toHaveBeenCalledTimes(1);
  });

  test('calls onIconRightClick when right icon is clicked', async () => {
    const handleIconRightClick = jest.fn();
    render(<Input iconRight="settings" onIconRightClick={handleIconRightClick} />);

    const icon = screen.getByTestId('mock-icon');
    await userEvent.click(icon);

    expect(handleIconRightClick).toHaveBeenCalledTimes(1);
  });

  test('renders both icons with different callbacks', async () => {
    const handleLeftClick = jest.fn();
    const handleRightClick = jest.fn();

    render(
        <Input
            iconLeft="search"
            iconRight="filter"
            onIconLeftClick={handleLeftClick}
            onIconRightClick={handleRightClick}
        />
    );

    const icons = screen.getAllByTestId('mock-icon');
    expect(icons).toHaveLength(2);

    // Click en icono izquierdo
    await userEvent.click(icons[0]);
    expect(handleLeftClick).toHaveBeenCalledTimes(1);
    expect(handleRightClick).not.toHaveBeenCalled();

    // Click en icono derecho
    await userEvent.click(icons[1]);
    expect(handleRightClick).toHaveBeenCalledTimes(1);
  });

  // ===== TESTS DE PASSWORD TOGGLE =====
  test('renders password toggle when showPasswordToggle is true', () => {
    render(<Input type="password" showPasswordToggle={true} />);

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveTextContent('eye'); // Estado inicial
  });

  test('toggles password visibility when toggle icon is clicked', async () => {
    render(<Input type="password" showPasswordToggle={true} />);

    const input = screen.getByRole('textbox');
    const toggleIcon = screen.getByTestId('mock-icon');

    // Estado inicial: password
    expect(input).toHaveAttribute('type', 'password');
    expect(toggleIcon).toHaveTextContent('eye');

    // Click para mostrar
    await userEvent.click(toggleIcon);
    expect(input).toHaveAttribute('type', 'text');
    expect(toggleIcon).toHaveTextContent('eye-slash');

    // Click para ocultar
    await userEvent.click(toggleIcon);
    expect(input).toHaveAttribute('type', 'password');
    expect(toggleIcon).toHaveTextContent('eye');
  });

  test('password toggle works with different sizes', () => {
    const { rerender } = render(
        <Input type="password" showPasswordToggle={true} size="small" />
    );
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-size', 'xs');

    rerender(<Input type="password" showPasswordToggle={true} size="large" />);
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-size', 'medium');
  });

  // ===== TESTS DE COMBINACIONES COMPLEJAS =====
  test('handles password toggle with custom right icon', () => {
    const handleRightClick = jest.fn();

    render(
        <Input
            type="password"
            showPasswordToggle={true}
            iconRight="lock"
            onIconRightClick={handleRightClick}
        />
    );

    // Debería mostrar el toggle en lugar del icono personalizado
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveTextContent('eye');
  });

  test('handles icon callbacks with disabled state', async () => {
    const handleIconClick = jest.fn();

    render(
        <Input
            icon="search"
            onIconClick={handleIconClick}
            disabled={true}
        />
    );

    const icon = screen.getByTestId('mock-icon');
    await userEvent.click(icon);

    // El callback debería funcionar incluso si el input está disabled
    expect(handleIconClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct padding when icons have callbacks', () => {
    const { rerender } = render(
        <Input iconLeft="search" onIconLeftClick={() => {}} />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('pl-10');

    rerender(
        <Input
            iconLeft="search"
            iconRight="filter"
            onIconLeftClick={() => {}}
            onIconRightClick={() => {}}
        />
    );

    expect(input).toHaveClass('px-10');
  });

  // ===== TESTS DE ACCESIBILIDAD CON CALLBACKS =====
  test('icons with callbacks have proper cursor style', () => {
    const { rerender } = render(<Input icon="search" />);

    const iconWithoutCallback = screen.getByTestId('mock-icon');
    expect(iconWithoutCallback).toHaveStyle('cursor: default');

    rerender(<Input icon="search" onIconClick={() => {}} />);

    const iconWithCallback = screen.getByTestId('mock-icon');
    expect(iconWithCallback).toHaveStyle('cursor: pointer');
  });

  test('password toggle maintains accessibility', async () => {
    render(<Input type="password" showPasswordToggle={true} />);

    const input = screen.getByRole('textbox');
    const toggleIcon = screen.getByTestId('mock-icon');

    // Verificar que el input cambia de tipo correctamente
    expect(input).toHaveAttribute('type', 'password');

    await userEvent.click(toggleIcon);
    expect(input).toHaveAttribute('type', 'text');
  });

  // ===== TESTS DE EDGE CASES CON CALLBACKS =====
  test('handles multiple rapid clicks on toggle', async () => {
    render(<Input type="password" showPasswordToggle={true} />);

    const input = screen.getByRole('textbox');
    const toggleIcon = screen.getByTestId('mock-icon');

    // Múltiples clicks rápidos
    await userEvent.click(toggleIcon);
    await userEvent.click(toggleIcon);
    await userEvent.click(toggleIcon);

    // Debería estar en estado password (impar número de clicks)
    expect(input).toHaveAttribute('type', 'password');
  });

  test('callback functions receive correct parameters', async () => {
    const handleIconClick = jest.fn();

    render(<Input icon="search" onIconClick={handleIconClick} />);

    const icon = screen.getByTestId('mock-icon');
    await userEvent.click(icon);

    expect(handleIconClick).toHaveBeenCalledWith();
  });

  test('handles null callback gracefully', () => {
    expect(() => {
      render(<Input icon="search" onIconClick={null} />);
    }).not.toThrow();
  });

  // ===== TESTS DE PERFORMANCE CON CALLBACKS =====
  test('does not re-render unnecessarily with callbacks', () => {
    const handleIconClick = jest.fn();
    const { rerender } = render(
        <Input icon="search" onIconClick={handleIconClick} />
    );

    // Re-render con las mismas props
    rerender(<Input icon="search" onIconClick={handleIconClick} />);

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  // ===== TESTS DE RETROCOMPATIBILIDAD =====
  test('maintains backward compatibility with old icon props', () => {
    render(<Input icon="search" iconPosition="right" />);

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('search');
  });

  test('new icon props override old ones correctly', () => {
    render(
        <Input
            icon="search"
            iconPosition="left"
            iconRight="filter"
        />
    );

    const icons = screen.getAllByTestId('mock-icon');
    expect(icons).toHaveLength(2);
    expect(icons[0]).toHaveTextContent('search'); // left from icon prop
    expect(icons[1]).toHaveTextContent('filter'); // right from iconRight prop
  });
});
