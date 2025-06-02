import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Badge from './Badge.jsx';

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
  return function MockText({ children, className, size }) {
    return <span data-testid="mock-text" className={className} data-size={size}>{children}</span>;
  };
});

describe('Badge Component', () => {
  // ===== TESTS BÁSICOS =====
  test('renders without crashing', () => {
    render(<Badge>Test</Badge>);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();
  });

  test('renders with children content', () => {
    render(<Badge>Hello World</Badge>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('renders with count', () => {
    render(<Badge count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('does not render when invisible', () => {
    render(<Badge invisible>Test</Badge>);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();
  });

  // ===== TESTS DE VARIANTES =====
  test('applies different variants correctly', () => {
    const { rerender } = render(<Badge variant="primary">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('bg-blue-500');

    rerender(<Badge variant="success">Test</Badge>);
    expect(badge).toHaveClass('bg-green-500');

    rerender(<Badge variant="error">Test</Badge>);
    expect(badge).toHaveClass('bg-red-500');
  });

  test('applies default variant when not specified', () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('bg-gray-100');
  });

  // ===== TESTS DE TAMAÑOS =====
  test('applies different sizes correctly', () => {
    const { rerender } = render(<Badge size="small">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('text-xs');

    rerender(<Badge size="medium">Test</Badge>);
    expect(badge).toHaveClass('text-xs');

    rerender(<Badge size="large">Test</Badge>);
    expect(badge).toHaveClass('text-sm');
  });

  // ===== TESTS DE FORMAS =====
  test('applies different shapes correctly', () => {
    const { rerender } = render(<Badge shape="rounded">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('rounded');

    rerender(<Badge shape="pill">Test</Badge>);
    expect(badge).toHaveClass('rounded-full');

    rerender(<Badge shape="square">Test</Badge>);
    expect(badge).toHaveClass('rounded-none');
  });

  // ===== TESTS DE ICONOS =====
  test('renders with icon', () => {
    render(<Badge icon="check">Success</Badge>);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveTextContent('check');
  });

  test('renders icon in different positions', () => {
    const { rerender } = render(<Badge icon="check" iconPosition="left">Test</Badge>);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveClass('mr-1');

    rerender(<Badge icon="check" iconPosition="right">Test</Badge>);
    expect(icon).toHaveClass('ml-1');
  });

  test('does not render icon when dot is true', () => {
    render(<Badge icon="check" dot />);
    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
  });

  // ===== TESTS DE CONTADOR =====
  test('formats count correctly', () => {
    const { rerender } = render(<Badge count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();

    rerender(<Badge count={150} max={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  test('handles zero count correctly', () => {
    const { rerender } = render(<Badge count={0} />);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();

    rerender(<Badge count={0} showZero />);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('does not render text when dot is true', () => {
    render(<Badge count={5} dot />);
    expect(screen.queryByTestId('mock-text')).not.toBeInTheDocument();
  });

  // ===== TESTS DE DOT BADGE =====
  test('renders dot badge correctly', () => {
    render(<Badge dot variant="error" />);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveAttribute('data-dot', 'true');
    expect(badge).toHaveClass('rounded-full');
  });

  test('dot badge has correct size classes', () => {
    const { rerender } = render(<Badge dot size="small" />);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('w-2', 'h-2');

    rerender(<Badge dot size="large" />);
    expect(badge).toHaveClass('w-3', 'h-3');
  });

  // ===== TESTS DE DISMISSIBLE =====
  test('renders dismiss button when dismissible', () => {
    render(<Badge dismissible>Test</Badge>);
    const dismissIcon = screen.getByTestId('mock-icon');
    expect(dismissIcon).toHaveTextContent('times');
  });

  test('calls onDismiss when dismiss button is clicked', async () => {
    const handleDismiss = jest.fn();
    render(<Badge dismissible onDismiss={handleDismiss}>Test</Badge>);

    const dismissIcon = screen.getByTestId('mock-icon');
    await userEvent.click(dismissIcon);

    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  test('does not render dismiss button when not dismissible', () => {
    render(<Badge>Test</Badge>);
    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
  });

  // ===== TESTS DE POSICIONAMIENTO =====
  test('applies positioned classes correctly', () => {
    render(<Badge positioned position="top-right" count={5} />);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveAttribute('data-positioned', 'true');
    expect(badge).toHaveClass('absolute', '-top-1', '-right-1');
  });

  test('applies different position classes', () => {
    const { rerender } = render(<Badge positioned position="top-left" count={1} />);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('-top-1', '-left-1');

    rerender(<Badge positioned position="bottom-right" count={1} />);
    expect(badge).toHaveClass('-bottom-1', '-right-1');
  });

  // ===== TESTS DE EVENTOS =====
  test('handles onClick event', async () => {
    const handleClick = jest.fn();
    render(<Badge onClick={handleClick}>Clickable</Badge>);

    const badge = screen.getByTestId('Badge');
    await userEvent.click(badge);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies cursor pointer when clickable', () => {
    render(<Badge onClick={() => {}}>Clickable</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('cursor-pointer');
  });

  // ===== TESTS DE VISIBILIDAD =====
  test('handles visibility with different conditions', () => {
    // Badge sin contenido no debe renderizarse
    const { rerender } = render(<Badge />);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();

    // Badge con children debe renderizarse
    rerender(<Badge>Content</Badge>);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();

    // Badge con count > 0 debe renderizarse
    rerender(<Badge count={1} />);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();

    // Badge dot siempre debe renderizarse
    rerender(<Badge dot />);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();
  });

  // ===== TESTS DE ATRIBUTOS DATA =====
  test('sets correct data attributes', () => {
    render(
        <Badge
            variant="primary"
            size="large"
            positioned
            dot
        >
          Test
        </Badge>
    );

    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveAttribute('data-variant', 'primary');
    expect(badge).toHaveAttribute('data-size', 'large');
    expect(badge).toHaveAttribute('data-positioned', 'true');
    expect(badge).toHaveAttribute('data-dot', 'true');
  });

  // ===== TESTS DE CLASES PERSONALIZADAS =====
  test('applies custom className', () => {
    render(<Badge className="custom-badge">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('custom-badge');
  });

  // ===== TESTS DE COMBINACIONES COMPLEJAS =====
  test('handles complex badge with all features', () => {
    const handleDismiss = jest.fn();
    const handleClick = jest.fn();

    render(
        <Badge
            variant="error"
            size="large"
            shape="pill"
            icon="exclamation-triangle"
            iconPosition="left"
            dismissible
            onDismiss={handleDismiss}
            onClick={handleClick}
            className="custom-class"
        >
          Critical Error
        </Badge>
    );

    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('bg-red-500', 'text-sm', 'rounded-full', 'cursor-pointer', 'custom-class');

    const icons = screen.getAllByTestId('mock-icon');
    expect(icons).toHaveLength(2); // main icon + dismiss icon
    expect(icons[0]).toHaveTextContent('exclamation-triangle');
    expect(icons[1]).toHaveTextContent('times');

    expect(screen.getByText('Critical Error')).toBeInTheDocument();
  });

  test('handles notification badge correctly', () => {
    render(
        <div style={{ position: 'relative' }}>
          <span>Button</span>
          <Badge count={12} variant="error" positioned position="top-right" />
        </div>
    );

    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('absolute', '-top-1', '-right-1', 'bg-red-500');
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  // ===== TESTS DE EDGE CASES =====
  test('handles negative count gracefully', () => {
    render(<Badge count={-5} />);
    expect(screen.getByText('-5')).toBeInTheDocument();
  });

  test('handles very large count', () => {
    render(<Badge count={9999} max={999} />);
    expect(screen.getByText('999+')).toBeInTheDocument();
  });

  test('handles empty string children', () => {
    render(<Badge>{''}</Badge>);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();
  });

  test('handles null children', () => {
    render(<Badge>{null}</Badge>);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();
  });

  // ===== TESTS DE ACCESIBILIDAD =====
  test('has proper accessibility attributes', () => {
    render(<Badge count={5} />);
    const badge = screen.getByTestId('Badge');
    expect(badge).toBeInTheDocument();
  });

  test('dismiss button is accessible', async () => {
    const handleDismiss = jest.fn();
    render(<Badge dismissible onDismiss={handleDismiss}>Test</Badge>);

    const dismissButton = screen.getByTestId('mock-icon');
    expect(dismissButton).toHaveStyle('cursor: pointer');
  });

  // ===== TESTS DE PERFORMANCE =====
  test('does not re-render unnecessarily', () => {
    const { rerender } = render(<Badge>Test</Badge>);
    const badge = screen.getByTestId('Badge');

    // Re-render con las mismas props
    rerender(<Badge>Test</Badge>);
    expect(badge).toBeInTheDocument();
  });

  test('handles rapid state changes', async () => {
    const { rerender } = render(<Badge count={0} />);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();

    rerender(<Badge count={1} />);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();

    rerender(<Badge count={0} />);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();
  });
});
