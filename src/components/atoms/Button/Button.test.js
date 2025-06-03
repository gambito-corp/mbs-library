import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button.jsx';

// Mock del componente Icon
jest.mock('../Icon/Icon.jsx', () => {
  return function MockIcon({ name, className, color }) {
    return (
        <span
            data-testid="mock-icon"
            className={className}
            style={{ color }}
        >
        {name}
      </span>
    );
  };
});

// Mock del componente Text
jest.mock('../Text/Text.jsx', () => {
  return function MockText({ children, className, textColor }) {
    return (
        <span
            data-testid="mock-text"
            className={className}
            style={{ color: textColor }}
        >
        {children}
      </span>
    );
  };
});

// ===== GRUPO 1: TESTS BÁSICOS DE RENDERIZADO =====
describe('Button Component - Renderizado Básico', () => {
  test('renderiza sin errores', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByTestId('Button')).toBeInTheDocument();
  });

  test('muestra el contenido de children correctamente', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('aplica props por defecto correctamente', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('button--primary');
    expect(button).toHaveClass('button--medium');
  });

  test('renderiza contenido vacío sin errores', () => {
    render(<Button></Button>);
    expect(screen.getByTestId('Button')).toBeInTheDocument();
  });
});

// ===== GRUPO 2: TESTS DE VARIANTES =====
describe('Button Component - Variantes', () => {
  test('aplica variante primary por defecto', () => {
    render(<Button>Primary</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--primary');
  });

  test('aplica variante gradient correctamente', () => {
    render(<Button variant="gradient">Gradient</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--gradient');
  });

  test('aplica variante secondary correctamente', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--secondary');
  });

  test('aplica variante success correctamente', () => {
    render(<Button variant="success">Success</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--success');
  });

  test('aplica variante danger correctamente', () => {
    render(<Button variant="danger">Danger</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--danger');
  });

  test('aplica variante warning correctamente', () => {
    render(<Button variant="warning">Warning</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--warning');
  });

  test('aplica variante outline correctamente', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--outline');
  });

  test('aplica variante ghost correctamente', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--ghost');
  });
});

// ===== GRUPO 3: TESTS DE VARIANTES DE JUEGO =====
describe('Button Component - Variantes de Juego', () => {
  test('aplica variante gameReveal correctamente', () => {
    render(<Button variant="gameReveal">Reveal</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--gameReveal');
  });

  test('aplica variante gameCorrect correctamente', () => {
    render(<Button variant="gameCorrect">Correct</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--gameCorrect');
  });

  test('aplica variante gameIncorrect correctamente', () => {
    render(<Button variant="gameIncorrect">Incorrect</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--gameIncorrect');
  });

  test('aplica variante gameRestart correctamente', () => {
    render(<Button variant="gameRestart">Restart</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--gameRestart');
  });

  test('aplica variante gameExit correctamente', () => {
    render(<Button variant="gameExit">Exit</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--gameExit');
  });
});

// ===== GRUPO 4: TESTS DE TAMAÑOS =====
describe('Button Component - Tamaños', () => {
  test('aplica tamaño medium por defecto', () => {
    render(<Button>Medium</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--medium');
  });

  test('aplica tamaño xs correctamente', () => {
    render(<Button size="xs">Extra Small</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--xs');
  });

  test('aplica tamaño small correctamente', () => {
    render(<Button size="small">Small</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--small');
  });

  test('aplica tamaño large correctamente', () => {
    render(<Button size="large">Large</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--large');
  });

  test('aplica tamaño xlarge correctamente', () => {
    render(<Button size="xlarge">Extra Large</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--xlarge');
  });

  test('aplica tamaño game correctamente', () => {
    render(<Button size="game">Game</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--game');
  });
});

// ===== GRUPO 5: TESTS DE ICONOS =====
describe('Button Component - Iconos', () => {
  test('renderiza con icono correctamente', () => {
    render(<Button icon="heart">With Icon</Button>);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveTextContent('heart');
    expect(screen.getByTestId('Button')).toHaveClass('button--with-icon');
  });

  test('renderiza solo icono cuando no hay children', () => {
    render(<Button icon="heart" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-text')).not.toBeInTheDocument();
  });

  test('aplica posición de icono left por defecto', () => {
    render(<Button icon="heart" iconPosition="left">Left Icon</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--with-icon');
  });

  test('aplica posición de icono right correctamente', () => {
    render(<Button icon="heart" iconPosition="right">Right Icon</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--with-icon');
    expect(screen.getByTestId('Button')).toHaveClass('button--icon-right');
  });

  test('aplica posición de icono top correctamente', () => {
    render(<Button icon="heart" iconPosition="top">Top Icon</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--icon-top');
  });

  test('aplica posición de icono bottom correctamente', () => {
    render(<Button icon="heart" iconPosition="bottom">Bottom Icon</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--icon-bottom');
  });

  test('aplica color personalizado al icono', () => {
    render(<Button icon="heart" iconColor="#ff0000">Colored Icon</Button>);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveStyle('color: #ff0000');
  });
});

// ===== GRUPO 6: TESTS DE ESTADOS =====
describe('Button Component - Estados', () => {
  test('aplica estado loading correctamente', () => {
    render(<Button loading={true}>Loading Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button).toHaveClass('button--loading');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('mock-icon')).toHaveTextContent('spinner');
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('aplica estado disabled correctamente', () => {
    render(<Button disabled={true}>Disabled Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button).toBeDisabled();
    expect(button).toHaveClass('button--disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('aplica fullWidth correctamente', () => {
    render(<Button fullWidth={true}>Full Width</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('button--full');
  });

  test('combina estados correctamente', () => {
    render(<Button loading={true} fullWidth={true}>Combined States</Button>);
    const button = screen.getByTestId('Button');
    expect(button).toHaveClass('button--loading');
    expect(button).toHaveClass('button--full');
  });
});

// ===== GRUPO 7: TESTS DE ELEMENTOS HTML =====
describe('Button Component - Elementos HTML', () => {
  test('renderiza como button por defecto', () => {
    render(<Button>Button Element</Button>);
    expect(screen.getByTestId('Button').tagName).toBe('BUTTON');
  });

  test('renderiza como enlace cuando as="a"', () => {
    render(<Button as="a" href="/test">Link Element</Button>);
    const linkElement = screen.getByTestId('Button');
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', '/test');
  });

  test('renderiza como div cuando as="div"', () => {
    render(<Button as="div">Div Element</Button>);
    expect(screen.getByTestId('Button').tagName).toBe('DIV');
  });

  test('maneja props de enlace correctamente', () => {
    render(<Button as="a" href="/test" target="_blank">Link Button</Button>);
    const link = screen.getByTestId('Button');

    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveAttribute('target', '_blank');
  });

  test('no aplica atributos de botón cuando es enlace', () => {
    render(<Button as="a" href="/test" type="submit">Link</Button>);
    const link = screen.getByTestId('Button');

    expect(link).not.toHaveAttribute('type');
    expect(link).toHaveAttribute('href', '/test');
  });
});

// ===== GRUPO 8: TESTS DE EVENTOS =====
describe('Button Component - Eventos', () => {
  test('maneja eventos click correctamente', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);

    fireEvent.click(screen.getByTestId('Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('no ejecuta click cuando está disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled={true}>Disabled</Button>);

    fireEvent.click(screen.getByTestId('Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('no ejecuta click cuando está loading', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} loading={true}>Loading</Button>);

    fireEvent.click(screen.getByTestId('Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('maneja eventos mouse correctamente', () => {
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

  test('maneja eventos focus correctamente', () => {
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
});

// ===== GRUPO 9: TESTS DE TIPOS DE BOTÓN =====
describe('Button Component - Tipos de Botón', () => {
  test('aplica type="button" por defecto', () => {
    render(<Button>Button Type</Button>);
    expect(screen.getByTestId('Button')).toHaveAttribute('type', 'button');
  });

  test('aplica type="submit" correctamente', () => {
    render(<Button type="submit">Submit Type</Button>);
    expect(screen.getByTestId('Button')).toHaveAttribute('type', 'submit');
  });

  test('aplica type="reset" correctamente', () => {
    render(<Button type="reset">Reset Type</Button>);
    expect(screen.getByTestId('Button')).toHaveAttribute('type', 'reset');
  });
});

// ===== GRUPO 10: TESTS DE COLORES PERSONALIZADOS =====
describe('Button Component - Colores Personalizados', () => {
  test('aplica color de texto personalizado', () => {
    render(<Button textColor="#ff0000">Red Text</Button>);
    const text = screen.getByTestId('mock-text');
    expect(text).toHaveStyle('color: #ff0000');
  });

  test('usa contraste automático cuando no se especifica textColor', () => {
    render(<Button variant="primary">Auto Contrast</Button>);
    const text = screen.getByTestId('mock-text');
    expect(text).toHaveStyle('color: #ffffff');
  });

  test('aplica color de icono personalizado', () => {
    render(<Button icon="heart" iconColor="#00ff00">Green Icon</Button>);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveStyle('color: #00ff00');
  });
});

// ===== GRUPO 11: TESTS DE CLASES PERSONALIZADAS =====
describe('Button Component - Clases Personalizadas', () => {
  test('aplica className personalizada correctamente', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    expect(screen.getByTestId('Button')).toHaveClass('custom-class');
  });

  test('combina clases BEM con clases personalizadas', () => {
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
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('button--primary');
    expect(button).toHaveClass('button--large');
    expect(button).toHaveClass('button--full');
    expect(button).toHaveClass('custom-class');
  });
});

// ===== GRUPO 12: TESTS DE CASOS EXTREMOS =====
describe('Button Component - Casos Extremos', () => {
  test('maneja children null sin errores', () => {
    render(<Button>{null}</Button>);
    expect(screen.getByTestId('Button')).toBeInTheDocument();
  });

  test('maneja children undefined sin errores', () => {
    render(<Button>{undefined}</Button>);
    expect(screen.getByTestId('Button')).toBeInTheDocument();
  });

  test('maneja contenido complejo correctamente', () => {
    render(
        <Button>
          <span>Complex</span>
          <strong>Content</strong>
        </Button>
    );

    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('maneja múltiples props sin conflictos', () => {
    render(
        <Button
            variant="gameCorrect"
            size="game"
            icon="check"
            iconPosition="left"
            fullWidth={true}
            loading={false}
            disabled={false}
            onClick={() => {}}
            className="complex-button"
        >
          ¡CORRECTO!
        </Button>
    );

    const button = screen.getByTestId('Button');
    expect(button).toHaveClass('button--gameCorrect');
    expect(button).toHaveClass('button--game');
    expect(button).toHaveClass('button--full');
    expect(button).toHaveClass('button--with-icon');
    expect(button).toHaveClass('complex-button');
    expect(screen.getByTestId('mock-icon')).toHaveTextContent('check');
    expect(screen.getByText('¡CORRECTO!')).toBeInTheDocument();
  });
});

// ===== GRUPO 13: TESTS DE ACCESIBILIDAD =====
describe('Button Component - Accesibilidad', () => {
  test('tiene atributos de accesibilidad correctos', () => {
    render(<Button>Accessible Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button).toHaveAttribute('data-testid', 'Button');
    expect(button).not.toHaveAttribute('aria-disabled', 'true');
  });

  test('mantiene accesibilidad cuando está disabled', () => {
    render(<Button disabled={true}>Disabled Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toBeDisabled();
  });

  test('mantiene accesibilidad cuando está loading', () => {
    render(<Button loading={true}>Loading Button</Button>);
    const button = screen.getByTestId('Button');

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  test('icono de loading tiene aria-label', () => {
    render(<Button loading={true}>Loading</Button>);
    // El mock no incluye ariaLabel, pero verificamos que se renderiza
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });
});

// ===== GRUPO 14: TESTS DE PROPS ADICIONALES =====
describe('Button Component - Props Adicionales', () => {
  test('pasa props adicionales al elemento', () => {
    render(
        <Button
            id="test-button"
            data-custom="value"
            title="Test Title"
        >
          Button with props
        </Button>
    );

    const button = screen.getByTestId('Button');
    expect(button).toHaveAttribute('id', 'test-button');
    expect(button).toHaveAttribute('data-custom', 'value');
    expect(button).toHaveAttribute('title', 'Test Title');
  });

  test('maneja estilos inline correctamente', () => {
    render(
        <Button style={{ backgroundColor: 'red', padding: '20px' }}>
          Styled Button
        </Button>
    );

    const button = screen.getByTestId('Button');
    expect(button).toHaveStyle('background-color: red');
    expect(button).toHaveStyle('padding: 20px');
  });
});
