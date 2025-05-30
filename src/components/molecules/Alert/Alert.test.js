import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from './Alert.jsx';

// Mock FontAwesome para evitar errores en tests
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className }) => (
      <span data-testid="font-awesome-icon" className={className}>
            {typeof icon === 'string' ? icon : icon[1] || icon}
        </span>
  )
}));

describe('Alert Component', () => {
  test('renders basic alert with message', () => {
    render(<Alert message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByTestId('Alert')).toBeInTheDocument();
  });

  test('renders alert with title and message', () => {
    render(<Alert title="Test Title" message="Test message" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('renders dismissible alert with close button', () => {
    const onDismiss = jest.fn();
    render(<Alert message="Test" dismissible onDismiss={onDismiss} />);

    const closeButton = screen.getByLabelText('Cerrar alerta');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('renders different alert types with correct classes', () => {
    const { rerender } = render(<Alert type="error" message="Error" />);
    expect(screen.getByRole('alert')).toHaveClass('text-red-700');

    rerender(<Alert type="success" message="Success" />);
    expect(screen.getByRole('alert')).toHaveClass('text-green-700');

    rerender(<Alert type="warning" message="Warning" />);
    expect(screen.getByRole('alert')).toHaveClass('text-yellow-700');

    rerender(<Alert type="info" message="Info" />);
    expect(screen.getByRole('alert')).toHaveClass('text-blue-700');
  });

  test('renders different variants correctly', () => {
    const { rerender } = render(<Alert type="info" variant="filled" message="Test" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-100');

    rerender(<Alert type="info" variant="outlined" message="Test" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-transparent');

    rerender(<Alert type="info" variant="solid" message="Test" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-500');
  });

  test('renders different sizes correctly', () => {
    const { rerender } = render(<Alert size="small" message="Test" />);
    expect(screen.getByRole('alert')).toHaveClass('text-sm');

    rerender(<Alert size="medium" message="Test" />);
    expect(screen.getByRole('alert')).toHaveClass('text-base');

    rerender(<Alert size="large" message="Test" />);
    expect(screen.getByRole('alert')).toHaveClass('text-lg');
  });

// O mejor aún:
  test('does not render when no message or children provided', () => {
    render(<Alert />);
    expect(screen.queryByTestId('Alert')).not.toBeInTheDocument();
  });

  test('renders children instead of message when provided', () => {
    render(
        <Alert>
          <span>Custom content</span>
        </Alert>
    );
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  test('shows icon by default', () => {
    render(<Alert type="error" message="Test" />);
    expect(screen.getByTestId('font-awesome-icon')).toBeInTheDocument();
  });

  test('hides icon when icon prop is false', () => {
    render(<Alert type="error" message="Test" icon={false} />);
    expect(screen.queryByTestId('font-awesome-icon')).not.toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Alert message="Test" className="custom-class" />);
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  test('has proper accessibility attributes', () => {
    render(<Alert message="Test" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
    expect(alert).toHaveAttribute('data-testid', 'Alert');
  });

  test('dismiss button has proper accessibility', () => {
    const onDismiss = jest.fn();
    render(<Alert message="Test" dismissible onDismiss={onDismiss} />);

    const dismissButton = screen.getByLabelText('Cerrar alerta');
    expect(dismissButton).toHaveAttribute('type', 'button');
    expect(dismissButton).toHaveAttribute('aria-label', 'Cerrar alerta');
  });

  test('renders correct icon for each type', () => {
    const { rerender } = render(<Alert type="error" message="Test" />);
    expect(screen.getByTestId('font-awesome-icon')).toHaveTextContent('exclamation-triangle');

    rerender(<Alert type="success" message="Test" />);
    expect(screen.getByTestId('font-awesome-icon')).toHaveTextContent('check');

    rerender(<Alert type="warning" message="Test" />);
    expect(screen.getByTestId('font-awesome-icon')).toHaveTextContent('exclamation-triangle');

    rerender(<Alert type="info" message="Test" />);
    expect(screen.getByTestId('font-awesome-icon')).toHaveTextContent('info-circle');
  });

  test('renders with all size combinations', () => {
    const sizes = ['small', 'medium', 'large'];
    const variants = ['filled', 'outlined', 'solid'];
    const types = ['error', 'success', 'warning', 'info'];

    sizes.forEach(size => {
      variants.forEach(variant => {
        types.forEach(type => {
          const { unmount } = render(
              <Alert
                  type={type}
                  variant={variant}
                  size={size}
                  message={`Test ${type} ${variant} ${size}`}
              />
          );
          expect(screen.getByRole('alert')).toBeInTheDocument();
          unmount();
        });
      });
    });
  });

  test('handles complex children content', () => {
    render(
        <Alert type="warning" title="Complex Content">
          <div>
            <p>This is a paragraph</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
            <button>Action Button</button>
          </div>
        </Alert>
    );

    expect(screen.getByText('Complex Content')).toBeInTheDocument();
    expect(screen.getByText('This is a paragraph')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  test('handles keyboard navigation on dismiss button', () => {
    const onDismiss = jest.fn();
    render(<Alert message="Test" dismissible onDismiss={onDismiss} />);

    const dismissButton = screen.getByLabelText('Cerrar alerta');

    // Simular Enter key
    fireEvent.keyDown(dismissButton, { key: 'Enter', code: 'Enter' });

    // Simular Space key
    fireEvent.keyDown(dismissButton, { key: ' ', code: 'Space' });

    expect(dismissButton).toHaveAttribute('type', 'button');
  });

  test('applies correct default props', () => {
    render(<Alert message="Test default props" />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('text-blue-700'); // info type default
    expect(alert).toHaveClass('bg-blue-100'); // filled variant default
    expect(alert).toHaveClass('text-base'); // medium size default
    expect(screen.getByTestId('font-awesome-icon')).toBeInTheDocument(); // icon true default
  });
});
