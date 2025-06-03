import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Badge from './Badge.jsx';

// Mock del componente Icon - SOLUCIÓN DEFINITIVA
jest.mock('../Icon/Icon.jsx', () => {
  return function MockIcon({ name, className, size, onClick, color }) {
    return (
        <span
            data-testid="mock-icon"
            className={className}
            data-icon-name={name}
            data-size={size}
            onClick={onClick}
            style={{
              cursor: onClick ? 'pointer' : 'default',
              color: color
            }}
        >
                {name}
            </span>
    );
  };
});

// Mock del componente Text - SOLUCIÓN DEFINITIVA
jest.mock('../Text/Text.jsx', () => {
  return function MockText({ children, className, size }) {
    return (
        <span
            data-testid="mock-text"
            className={className}
            data-size={size}
        >
                {children}
            </span>
    );
  };
});

// ===== GRUPO 1: TESTS BÁSICOS DE RENDERIZADO =====
describe('Badge Component - Renderizado Básico', () => {
  test('renderiza sin errores', () => {
    render(<Badge>Test</Badge>);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();
  });

  test('renderiza con contenido children', () => {
    render(<Badge>Hello World</Badge>);
    expect(screen.getByTestId('mock-text')).toBeInTheDocument();
    expect(screen.getByTestId('mock-text')).toHaveTextContent('Hello World');
  });

  test('renderiza con contador', () => {
    render(<Badge count={5} />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('5');
  });

  test('no renderiza cuando es invisible', () => {
    render(<Badge invisible>Test</Badge>);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();
  });

  test('no renderiza cuando no tiene contenido', () => {
    render(<Badge />);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();
  });
});

// ===== GRUPO 2: TESTS DE VARIANTES =====
describe('Badge Component - Variantes', () => {
  test('aplica variante default por defecto', () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('bg-gray-100');
    expect(badge).toHaveClass('text-gray-800');
  });

  test('aplica variante primary correctamente', () => {
    render(<Badge variant="primary">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('bg-blue-500');
    expect(badge).toHaveClass('text-white');
  });

  test('aplica variante success correctamente', () => {
    render(<Badge variant="success">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('bg-green-500');
    expect(badge).toHaveClass('text-white');
  });

  test('aplica variante error correctamente', () => {
    render(<Badge variant="error">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('bg-red-500');
    expect(badge).toHaveClass('text-white');
  });

  test('aplica variante warning correctamente', () => {
    render(<Badge variant="warning">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('bg-yellow-500');
    expect(badge).toHaveClass('text-black');
  });

  test('aplica variante info correctamente', () => {
    render(<Badge variant="info">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('bg-blue-400');
    expect(badge).toHaveClass('text-white');
  });
});

// ===== GRUPO 3: TESTS DE TAMAÑOS =====
describe('Badge Component - Tamaños', () => {
  test('aplica tamaño medium por defecto', () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('px-2');
    expect(badge).toHaveClass('py-1');
    expect(badge).toHaveClass('text-xs');
    expect(badge).toHaveClass('h-5');
  });

  test('aplica tamaño small correctamente', () => {
    render(<Badge size="small">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('px-1.5');
    expect(badge).toHaveClass('py-0.5');
    expect(badge).toHaveClass('text-xs');
    expect(badge).toHaveClass('h-4');
  });

  test('aplica tamaño large correctamente', () => {
    render(<Badge size="large">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('px-2.5');
    expect(badge).toHaveClass('py-1');
    expect(badge).toHaveClass('text-sm');
    expect(badge).toHaveClass('h-6');
  });
});

// ===== GRUPO 4: TESTS DE FORMAS =====
describe('Badge Component - Formas', () => {
  test('aplica forma rounded por defecto', () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('rounded');
  });

  test('aplica forma pill correctamente', () => {
    render(<Badge shape="pill">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('rounded-full');
  });

  test('aplica forma square correctamente', () => {
    render(<Badge shape="square">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('rounded-none');
  });
});

// ===== GRUPO 5: TESTS DE CONTADOR =====
describe('Badge Component - Contador', () => {
  test('formatea contador correctamente', () => {
    const { rerender } = render(<Badge count={5} />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('5');

    rerender(<Badge count={23} />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('23');

    rerender(<Badge count={150} max={99} />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('99+');
  });

  test('maneja contador cero correctamente', () => {
    const { rerender } = render(<Badge count={0} />);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();

    rerender(<Badge count={0} showZero />);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();

    // ✅ CORREGIDO: Verificar el texto directamente en el Badge, no en mock-text
    expect(screen.getByTestId('Badge')).toHaveTextContent('0');
  });

  test('maneja contadores negativos', () => {
    render(<Badge count={-5} />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('-5');
  });
});

// ===== GRUPO 6: TESTS DE DOT BADGE =====
describe('Badge Component - Dot Badge', () => {
  test('renderiza dot badge correctamente', () => {
    render(<Badge dot variant="error" />);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveAttribute('data-dot', 'true');
    expect(badge).toHaveClass('rounded-full');
  });

  test('dot badge tiene clases de tamaño correctas', () => {
    const { rerender } = render(<Badge dot size="small" />);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('w-2', 'h-2');

    rerender(<Badge dot size="medium" />);
    expect(badge).toHaveClass('w-2.5', 'h-2.5');

    rerender(<Badge dot size="large" />);
    expect(badge).toHaveClass('w-3', 'h-3');
  });

  test('dot badge siempre es visible', () => {
    render(<Badge dot />);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();
  });

  test('dot badge no renderiza texto', () => {
    render(<Badge dot count={5} />);
    expect(screen.queryByTestId('mock-text')).not.toBeInTheDocument();
  });
});

// ===== GRUPO 7: TESTS DE POSICIONAMIENTO =====
describe('Badge Component - Posicionamiento', () => {
  test('aplica clases de posicionamiento correctamente', () => {
    render(<Badge positioned position="top-right" count={5} />);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveAttribute('data-positioned', 'true');
    expect(badge).toHaveClass('absolute');
    expect(badge).toHaveClass('-top-1');
    expect(badge).toHaveClass('-right-1');
    expect(badge).toHaveClass('z-10');
  });

  test('aplica diferentes posiciones correctamente', () => {
    const { rerender } = render(<Badge positioned position="top-left" count={1} />);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('-top-1', '-left-1');

    rerender(<Badge positioned position="bottom-right" count={1} />);
    expect(badge).toHaveClass('-bottom-1', '-right-1');

    rerender(<Badge positioned position="bottom-left" count={1} />);
    expect(badge).toHaveClass('-bottom-1', '-left-1');
  });

  test('badge posicionado se envuelve en contenedor relativo', () => {
    render(<Badge positioned count={5} />);
    const badge = screen.getByTestId('Badge');
    const container = badge.parentElement;
    expect(container).toHaveClass('relative');
    expect(container).toHaveClass('inline-block');
  });
});

// ===== GRUPO 8: TESTS DE EVENTOS =====
describe('Badge Component - Eventos', () => {
  test('maneja evento onClick', async () => {
    const handleClick = jest.fn();
    render(<Badge onClick={handleClick}>Clickable</Badge>);

    const badge = screen.getByTestId('Badge');
    await userEvent.click(badge);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('aplica cursor pointer cuando es clickable', () => {
    render(<Badge onClick={() => {}}>Clickable</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('cursor-pointer');
  });

  test('aplica hover opacity cuando es clickable', () => {
    render(<Badge onClick={() => {}}>Clickable</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('hover:opacity-80');
  });
});

// ===== GRUPO 9: TESTS DE VISIBILIDAD =====
describe('Badge Component - Visibilidad', () => {
  test('maneja visibilidad con diferentes condiciones', () => {
    const { rerender } = render(<Badge />);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();

    rerender(<Badge>Content</Badge>);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();

    rerender(<Badge count={1} />);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();

    rerender(<Badge dot />);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();

    rerender(<Badge invisible>Content</Badge>);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();
  });

  test('maneja children vacíos', () => {
    const { rerender } = render(<Badge>{''}</Badge>);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();

    rerender(<Badge>{null}</Badge>);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();

    rerender(<Badge>{undefined}</Badge>);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();
  });
});

// ===== GRUPO 10: TESTS DE ATRIBUTOS DATA =====
describe('Badge Component - Atributos Data', () => {
  test('establece atributos data correctos', () => {
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

  test('aplica className personalizada', () => {
    render(<Badge className="custom-badge">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('custom-badge');
  });
});

// ===== GRUPO 11: TESTS DE CASOS EXTREMOS =====
describe('Badge Component - Casos Extremos', () => {
  test('maneja contador muy grande', () => {
    render(<Badge count={9999} max={999} />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('999+');
  });

  test('maneja max menor que count', () => {
    render(<Badge count={5} max={3} />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('3+');
  });

  test('maneja cambios rápidos de estado', async () => {
    const { rerender } = render(<Badge count={0} />);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();

    rerender(<Badge count={1} />);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();

    rerender(<Badge count={0} />);
    expect(screen.queryByTestId('Badge')).not.toBeInTheDocument();
  });

  test('maneja props adicionales', () => {
    render(<Badge data-custom="value" title="Badge title">Test</Badge>);
    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveAttribute('data-custom', 'value');
    expect(badge).toHaveAttribute('title', 'Badge title');
  });
});

// ===== GRUPO 12: TESTS DE ACCESIBILIDAD =====
describe('Badge Component - Accesibilidad', () => {
  test('badge tiene testid correcto', () => {
    render(<Badge>Test</Badge>);
    expect(screen.getByTestId('Badge')).toBeInTheDocument();
  });

  test('badge clickable es accesible', () => {
    const handleClick = jest.fn();
    render(<Badge onClick={handleClick}>Clickable</Badge>);

    const badge = screen.getByTestId('Badge');
    expect(badge).toHaveClass('cursor-pointer');
  });

  test('badge mantiene estructura semántica', () => {
    render(<Badge count={5} />);
    const badge = screen.getByTestId('Badge');
    expect(badge.tagName).toBe('SPAN');
  });
});
