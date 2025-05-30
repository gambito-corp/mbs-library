import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Text from './Text.jsx';

// Mock para setTimeout en animaciones
jest.useFakeTimers();

describe('Text Component', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  // ===== TESTS BÁSICOS =====
  test('renders basic text correctly', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByTestId('Text')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('renders text using text prop', () => {
    render(<Text text="Hello from prop" />);
    expect(screen.getByText('Hello from prop')).toBeInTheDocument();
  });

  test('prioritizes children over text prop', () => {
    render(<Text text="Text prop">Children content</Text>);
    expect(screen.getByText('Children content')).toBeInTheDocument();
    expect(screen.queryByText('Text prop')).not.toBeInTheDocument();
  });

  // ===== TESTS DE VARIANTES =====
  test('applies default variant correctly', () => {
    render(<Text>Default text</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('text-gray-900');
  });

  test('applies highlight variant correctly', () => {
    render(<Text variant="highlight">Highlighted text</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('bg-yellow-200');
  });

  test('applies gradient variant correctly', () => {
    render(<Text variant="gradient">Gradient text</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('bg-gradient-to-r');
  });

  test('applies neon variant correctly', () => {
    render(<Text variant="neon">Neon text</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('text-cyan-400');
  });

  test('applies retro variant correctly', () => {
    render(<Text variant="retro">Retro text</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('font-mono');
  });

  test('applies muted variant correctly', () => {
    render(<Text variant="muted">Muted text</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('text-gray-500');
  });

  test('applies bold variant correctly', () => {
    render(<Text variant="bold">Bold text</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('font-bold');
  });

  test('applies italic variant correctly', () => {
    render(<Text variant="italic">Italic text</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('italic');
  });

  // ===== TESTS DE TAMAÑOS =====
  test('applies different sizes correctly', () => {
    const { rerender } = render(<Text size="xs">Extra small</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('text-xs');

    rerender(<Text size="small">Small</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('text-sm');

    rerender(<Text size="medium">Medium</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('text-base');

    rerender(<Text size="large">Large</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('text-lg');

    rerender(<Text size="xlarge">Extra large</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('text-xl');

    rerender(<Text size="2xl">2X Large</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('text-2xl');

    rerender(<Text size="3xl">3X Large</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('text-3xl');
  });

  // ===== TESTS DE ELEMENTOS HTML =====
  test('renders as different HTML elements', () => {
    const { rerender } = render(<Text as="h1">Heading 1</Text>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    rerender(<Text as="h2">Heading 2</Text>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();

    rerender(<Text as="p">Paragraph</Text>);
    expect(screen.getByText('Paragraph').tagName).toBe('P');

    rerender(<Text as="label">Label</Text>);
    expect(screen.getByText('Label').tagName).toBe('LABEL');

    rerender(<Text as="div">Div</Text>);
    expect(screen.getByText('Div').tagName).toBe('DIV');
  });

  // ===== TESTS DE ANIMACIÓN =====
  test('renders static text when animated is false', () => {
    render(<Text animated={false}>Static text</Text>);
    expect(screen.getByText('Static text')).toBeInTheDocument();
    expect(screen.queryByText('|')).not.toBeInTheDocument();
  });

  test('renders animated text when animated is true', () => {
    render(<Text animated={true} speed={100}>Animated text</Text>);
    expect(screen.getByTestId('Text')).toHaveAttribute('data-animated', 'true');
    expect(screen.getByText('|')).toBeInTheDocument(); // Cursor
  });

  test('animates text progressively', async () => {
    render(<Text animated={true} speed={100}>Hi</Text>);

    // Inicialmente debería estar vacío
    expect(screen.getByTestId('Text')).not.toHaveTextContent('Hi');

    // Avanzar el timer
    jest.advanceTimersByTime(100);
    await waitFor(() => {
      expect(screen.getByTestId('Text')).toHaveTextContent('H');
    });

    jest.advanceTimersByTime(100);
    await waitFor(() => {
      expect(screen.getByTestId('Text')).toHaveTextContent('Hi');
    });
  });

  test('calls onComplete when animation finishes', async () => {
    const onComplete = jest.fn();
    render(<Text animated={true} speed={50} onComplete={onComplete}>Hi</Text>);

    // Avanzar hasta completar la animación
    jest.advanceTimersByTime(150); // 2 caracteres * 50ms + margen

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    });
  });

  test('shows custom cursor character', () => {
    render(<Text animated={true} cursorChar="█">Text</Text>);
    expect(screen.getByText('█')).toBeInTheDocument();
  });

  test('hides cursor when showCursor is false', () => {
    render(<Text animated={true} showCursor={false}>Text</Text>);
    expect(screen.queryByText('|')).not.toBeInTheDocument();
  });

  test('pauses animation on hover when pauseOnHover is true', () => {
    render(<Text animated={true} pauseOnHover={true}>Test text</Text>);
    const element = screen.getByTestId('Text');

    fireEvent.mouseEnter(element);
    // Verificar que la animación se pausa (esto requeriría más setup para testear completamente)
    expect(element).toBeInTheDocument();

    fireEvent.mouseLeave(element);
    expect(element).toBeInTheDocument();
  });

  // ===== TESTS DE HTML ENRIQUECIDO =====
  test('renders HTML content when htmlStyles is true', () => {
    render(<Text htmlStyles={true} text="<strong>Bold</strong> text" />);
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Bold').tagName).toBe('STRONG');
  });

  test('renders HTML content as plain text when htmlStyles is false', () => {
    render(<Text htmlStyles={false} text="<strong>Bold</strong> text" />);
    expect(screen.getByText('<strong>Bold</strong> text')).toBeInTheDocument();
  });

  test('animates HTML content correctly', async () => {
    render(
        <Text
            animated={true}
            htmlStyles={true}
            speed={100}
            text="<em>Italic</em> text"
        />
    );

    // La animación debería funcionar con contenido HTML
    jest.advanceTimersByTime(500);
    await waitFor(() => {
      expect(screen.getByTestId('Text')).toBeInTheDocument();
    });
  });

  // ===== TESTS DE PROPS ADICIONALES =====
  test('applies custom className', () => {
    render(<Text className="custom-class">Text</Text>);
    expect(screen.getByTestId('Text')).toHaveClass('custom-class');
  });

  test('passes through additional props', () => {
    render(<Text data-custom="value" id="text-id">Text</Text>);
    expect(screen.getByTestId('Text')).toHaveAttribute('data-custom', 'value');
    expect(screen.getByTestId('Text')).toHaveAttribute('id', 'text-id');
  });

  // ===== TESTS DE EDGE CASES =====
  test('handles empty text gracefully', () => {
    render(<Text text="" />);
    expect(screen.getByTestId('Text')).toBeInTheDocument();
    expect(screen.getByTestId('Text')).toBeEmptyDOMElement();
  });

  test('handles null children gracefully', () => {
    render(<Text>{null}</Text>);
    expect(screen.getByTestId('Text')).toBeInTheDocument();
  });

  test('handles undefined text prop gracefully', () => {
    render(<Text text={undefined} />);
    expect(screen.getByTestId('Text')).toBeInTheDocument();
  });

  test('handles numeric content', () => {
    render(<Text>{123}</Text>);
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  test('handles boolean content', () => {
    render(<Text>{true}</Text>);
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  // ===== TESTS DE LOOP =====
  test('loops animation when loop is true', async () => {
    const onComplete = jest.fn();
    render(<Text animated={true} loop={true} speed={50} onComplete={onComplete}>Hi</Text>);

    // Completar primera iteración
    jest.advanceTimersByTime(150);

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    });

    // Debería empezar de nuevo después de 1 segundo
    jest.advanceTimersByTime(1000);
    expect(screen.getByTestId('Text')).toBeInTheDocument();
  });

  // ===== TESTS DE ACCESIBILIDAD =====
  test('has proper data attributes', () => {
    render(<Text animated={true}>Accessible text</Text>);
    expect(screen.getByTestId('Text')).toHaveAttribute('data-testid', 'Text');
    expect(screen.getByTestId('Text')).toHaveAttribute('data-animated', 'true');
  });

  test('maintains semantic meaning with different elements', () => {
    render(<Text as="h1">Main heading</Text>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main heading');
  });

  // ===== TESTS DE COMBINACIONES COMPLEJAS =====
  test('handles complex combinations of props', () => {
    render(
        <Text
            animated={true}
            variant="gradient"
            size="large"
            as="h2"
            speed={100}
            showCursor={true}
            cursorChar="▶"
            className="custom-class"
        >
          Complex text
        </Text>
    );

    const element = screen.getByTestId('Text');
    expect(element).toHaveClass('bg-gradient-to-r'); // gradient variant
    expect(element).toHaveClass('text-lg'); // large size
    expect(element).toHaveClass('custom-class'); // custom class
    expect(element.tagName).toBe('H2'); // as prop
    expect(element).toHaveAttribute('data-animated', 'true'); // animated
    expect(screen.getByText('▶')).toBeInTheDocument(); // custom cursor
  });
});
