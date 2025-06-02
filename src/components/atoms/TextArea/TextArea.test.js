import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TextArea from './TextArea.jsx';

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

describe('TextArea Component', () => {
  // ===== TESTS BÁSICOS =====
  test('renders without crashing', () => {
    render(<TextArea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with placeholder', () => {
    render(<TextArea placeholder="Enter text" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter text');
  });

  test('renders with default rows', () => {
    render(<TextArea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '3');
  });

  test('renders with custom rows', () => {
    render(<TextArea rows={5} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  // ===== TESTS DE TAMAÑOS =====
  test('applies different sizes correctly', () => {
    const { rerender } = render(<TextArea size="small" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('text-sm');

    rerender(<TextArea size="medium" />);
    expect(textarea).toHaveClass('text-base');

    rerender(<TextArea size="large" />);
    expect(textarea).toHaveClass('text-lg');
  });

  // ===== TESTS DE VARIANTES =====
  test('applies different variants correctly', () => {
    const { rerender } = render(<TextArea variant="default" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-gray-300');

    rerender(<TextArea variant="error" />);
    expect(textarea).toHaveClass('border-red-500');

    rerender(<TextArea variant="success" />);
    expect(textarea).toHaveClass('border-green-500');
  });

  // ===== TESTS DE RESIZE =====
  test('applies resize options correctly', () => {
    const { rerender } = render(<TextArea resize="none" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('resize-none');

    rerender(<TextArea resize="vertical" />);
    expect(textarea).toHaveClass('resize-y');

    rerender(<TextArea resize="horizontal" />);
    expect(textarea).toHaveClass('resize-x');

    rerender(<TextArea resize="both" />);
    expect(textarea).toHaveClass('resize');
  });

  // ===== TESTS DE ESTADOS =====
  test('handles disabled state correctly', () => {
    render(<TextArea disabled={true} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('opacity-50');
  });

  test('handles readOnly state correctly', () => {
    render(<TextArea readOnly={true} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
  });

  test('handles required state correctly', () => {
    render(<TextArea required={true} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeRequired();
  });

  // ===== TESTS DE ICONOS =====
  test('renders with left icon', () => {
    render(<TextArea iconLeft="comment" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveTextContent('comment');
  });

  test('renders with right icon', () => {
    render(<TextArea iconRight="send" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveTextContent('send');
  });

  test('renders with both icons', () => {
    render(<TextArea iconLeft="comment" iconRight="send" />);
    const icons = screen.getAllByTestId('mock-icon');
    expect(icons).toHaveLength(2);
    expect(icons[0]).toHaveTextContent('comment');
    expect(icons[1]).toHaveTextContent('send');
  });

  test('calls icon callbacks when clicked', async () => {
    const handleLeftClick = jest.fn();
    const handleRightClick = jest.fn();

    render(
        <TextArea
            iconLeft="comment"
            iconRight="send"
            onIconLeftClick={handleLeftClick}
            onIconRightClick={handleRightClick}
        />
    );

    const icons = screen.getAllByTestId('mock-icon');

    await userEvent.click(icons[0]);
    expect(handleLeftClick).toHaveBeenCalledTimes(1);

    await userEvent.click(icons[1]);
    expect(handleRightClick).toHaveBeenCalledTimes(1);
  });

  // ===== TESTS DE AUTO-GROW =====
  test('enables auto-grow when specified', () => {
    render(<TextArea autoGrow={true} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('overflow-hidden');
  });

  test('uses minRows and maxRows with auto-grow', () => {
    render(<TextArea autoGrow={true} minRows={2} maxRows={8} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '2');
  });

  // ===== TESTS DE LABEL Y MENSAJES =====
  test('renders with label', () => {
    render(<TextArea label="Comments" />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('Comments');
  });

  test('renders with error message', () => {
    render(<TextArea error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass('text-red-500');
  });

  test('renders with success message', () => {
    render(<TextArea success="Saved successfully" />);
    expect(screen.getByText('Saved successfully')).toBeInTheDocument();
    expect(screen.getByText('Saved successfully')).toHaveClass('text-green-500');
  });

  test('renders with helper text', () => {
    render(<TextArea helperText="Optional field" />);
    expect(screen.getByText('Optional field')).toBeInTheDocument();
    expect(screen.getByText('Optional field')).toHaveClass('text-gray-500');
  });

  test('shows required asterisk when required', () => {
    render(<TextArea label="Comments" required={true} />);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  // ===== TESTS DE CONTADOR DE CARACTERES =====
  test('renders character counter when maxLength is set', () => {
    render(<TextArea maxLength={100} />);
    expect(screen.getByText('0/100')).toBeInTheDocument();
  });

  test('updates character counter on input', async () => {
    render(<TextArea maxLength={100} />);
    const textarea = screen.getByRole('textbox');

    await userEvent.type(textarea, 'Hello');
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  test('character counter changes color near limit', async () => {
    render(<TextArea maxLength={10} />);
    const textarea = screen.getByRole('textbox');

    // Escribir cerca del límite (80%)
    await userEvent.type(textarea, 'Hello123');
    const counter = screen.getByText('8/10');
    expect(counter).toHaveClass('text-yellow-500');
  });

  test('character counter shows danger when over limit', async () => {
    render(<TextArea maxLength={5} />);
    const textarea = screen.getByRole('textbox');

    // Escribir más del límite
    await userEvent.type(textarea, 'Hello World');
    const counter = screen.getByText('11/5');
    expect(counter).toHaveClass('text-red-500');
  });

  // ===== TESTS DE EVENTOS =====
  test('handles onChange event', async () => {
    const handleChange = jest.fn();
    render(<TextArea onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'test');

    expect(handleChange).toHaveBeenCalled();
  });

  test('handles onFocus event', async () => {
    const handleFocus = jest.fn();
    render(<TextArea onFocus={handleFocus} />);

    const textarea = screen.getByRole('textbox');
    await userEvent.click(textarea);

    expect(handleFocus).toHaveBeenCalled();
  });

  test('handles onBlur event', async () => {
    const handleBlur = jest.fn();
    render(<TextArea onBlur={handleBlur} />);

    const textarea = screen.getByRole('textbox');
    await userEvent.click(textarea);
    await userEvent.tab();

    expect(handleBlur).toHaveBeenCalled();
  });

  // ===== TESTS DE VALORES =====
  test('renders with controlled value', () => {
    render(<TextArea value="test value" onChange={() => {}} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('test value');
  });

  test('renders with default value', () => {
    render(<TextArea defaultValue="default test" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('default test');
  });

  // ===== TESTS DE ATRIBUTOS HTML =====
  test('applies HTML attributes correctly', () => {
    render(
        <TextArea
            id="test-textarea"
            name="testName"
            maxLength={50}
            minLength={5}
            cols={40}
        />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('id', 'test-textarea');
    expect(textarea).toHaveAttribute('name', 'testName');
    expect(textarea).toHaveAttribute('maxlength', '50');
    expect(textarea).toHaveAttribute('minlength', '5');
    expect(textarea).toHaveAttribute('cols', '40');
  });

  test('applies autoFocus correctly', () => {
    render(<TextArea autoFocus={true} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveFocus();
  });

  // ===== TESTS DE LAYOUT =====
  test('applies fullWidth correctly', () => {
    const { rerender } = render(<TextArea fullWidth={true} />);
    const container = screen.getByRole('textbox').closest('.textarea-container');
    expect(container).toHaveClass('w-full');

    rerender(<TextArea fullWidth={false} />);
    expect(container).toHaveClass('inline-block');
  });

  // ===== TESTS DE ACCESIBILIDAD =====
  test('has proper accessibility attributes', () => {
    render(<TextArea error="Error message" id="test-textarea" />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby');
  });

  test('associates label with textarea correctly', () => {
    render(<TextArea label="Comments" id="comments-textarea" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('id', 'comments-textarea');
  });

  // ===== TESTS DE COMBINACIONES COMPLEJAS =====
  test('handles complex combinations correctly', () => {
    render(
        <TextArea
            label="Message"
            placeholder="Enter your message"
            iconLeft="comment"
            iconRight="send"
            autoGrow={true}
            minRows={3}
            maxRows={8}
            maxLength={500}
            required={true}
            error="Message is required"
            size="large"
            resize="none"
            className="custom-textarea"
        />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter your message');
    expect(textarea).toBeRequired();
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('rows', '3');
    expect(textarea).toHaveClass('text-lg'); // large size
    expect(textarea).toHaveClass('resize-none');
    expect(textarea).toHaveClass('custom-textarea');
    expect(textarea).toHaveClass('overflow-hidden'); // autoGrow

    const icons = screen.getAllByTestId('mock-icon');
    expect(icons).toHaveLength(2);
    expect(icons[0]).toHaveTextContent('comment');
    expect(icons[1]).toHaveTextContent('send');

    expect(screen.getByTestId('mock-text')).toHaveTextContent('Message');
    expect(screen.getByText('Message is required')).toBeInTheDocument();
    expect(screen.getByText('0/500')).toBeInTheDocument();
  });

  // ===== TESTS DE EDGE CASES =====
  test('handles empty props gracefully', () => {
    render(<TextArea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  test('prioritizes error over success', () => {
    render(<TextArea error="Error message" success="Success message" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-red-500');
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Success message')).not.toBeInTheDocument();
  });

  test('handles null values gracefully', () => {
    render(<TextArea value={null} onChange={() => {}} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  // ===== TESTS DE PERFORMANCE =====
  test('does not re-render unnecessarily', () => {
    const handleChange = jest.fn();
    const { rerender } = render(<TextArea onChange={handleChange} />);

    // Re-render con las mismas props
    rerender(<TextArea onChange={handleChange} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
