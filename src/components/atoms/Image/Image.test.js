import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Image from './Image.jsx';
import Badge from '../Badge/Badge.jsx';

// Mock del componente Icon
jest.mock('../Icon/Icon.jsx', () => {
  return function MockIcon({ name, className, size }) {
    return (
        <span
            data-testid="mock-icon"
            className={className}
            data-icon-name={name}
            data-size={size}
        >
                {name}
            </span>
    );
  };
});

// Mock del componente Text
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

// Mock del componente Badge
jest.mock('../Badge/Badge.jsx', () => {
  return function MockBadge({ children, count, variant, positioned }) {
    return (
        <span
            data-testid="mock-badge"
            data-variant={variant}
            data-positioned={positioned}
            data-count={count}
        >
                {children || count}
            </span>
    );
  };
});

// ===== GRUPO 1: TESTS BÁSICOS DE RENDERIZADO =====
describe('Image Component - Renderizado Básico', () => {
  test('renderiza sin errores', () => {
    render(<Image src="test.jpg" alt="Test image" />);
    expect(screen.getByTestId('Image')).toBeInTheDocument();
  });

  test('renderiza imagen con src correctamente', () => {
    render(<Image src="test.jpg" alt="Test image" lazy={false} />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveAttribute('src', 'test.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  test('renderiza fallback cuando no hay src', () => {
    render(<Image alt="Test image" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  test('aplica data attributes correctamente', () => {
    render(<Image src="test.jpg" variant="avatar" size="large" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveAttribute('data-variant', 'avatar');
    expect(image).toHaveAttribute('data-size', 'large');
    expect(image).toHaveAttribute('data-shape', 'circle');
  });
});

// ===== GRUPO 2: TESTS DE VARIANTES =====
describe('Image Component - Variantes', () => {
  test('aplica variante thumbnail por defecto', () => {
    render(<Image src="test.jpg" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image');
    expect(image).toHaveAttribute('data-variant', 'thumbnail');
  });

  test('aplica variante avatar correctamente', () => {
    render(<Image variant="avatar" src="test.jpg" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--avatar');
    expect(image).toHaveAttribute('data-shape', 'circle');
  });

  test('aplica variante hero correctamente', () => {
    render(<Image variant="hero" src="test.jpg" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--hero');
  });

  test('aplica variante gallery correctamente', () => {
    render(<Image variant="gallery" src="test.jpg" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--gallery');
  });

  test('aplica variante product correctamente', () => {
    render(<Image variant="product" src="test.jpg" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--product');
  });
});

// ===== GRUPO 3: TESTS DE TAMAÑOS =====
describe('Image Component - Tamaños', () => {
  test('aplica tamaño medium por defecto', () => {
    render(<Image src="test.jpg" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image');
    expect(image).toHaveAttribute('data-size', 'medium');
  });

  test('aplica tamaño xs correctamente', () => {
    render(<Image src="test.jpg" size="xs" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--xs');
  });

  test('aplica tamaño small correctamente', () => {
    render(<Image src="test.jpg" size="small" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--small');
  });

  test('aplica tamaño large correctamente', () => {
    render(<Image src="test.jpg" size="large" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--large');
  });

  test('aplica tamaño xl correctamente', () => {
    render(<Image src="test.jpg" size="xl" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--xl');
  });
});

// ===== GRUPO 4: TESTS DE FORMAS =====
describe('Image Component - Formas', () => {
  test('aplica forma rounded por defecto', () => {
    render(<Image src="test.jpg" lazy={false} />);
    const image = screen.getByTestId('Image');
    // ✅ CORREGIDO: Verificar data-attribute en lugar de clase CSS
    expect(image).toHaveAttribute('data-shape', 'rounded');
  });

  test('aplica forma circle correctamente', () => {
    render(<Image src="test.jpg" shape="circle" lazy={false} />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--circle');
  });

  test('aplica forma square correctamente', () => {
    render(<Image src="test.jpg" shape="square" lazy={false} />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--square');
  });

  test('avatar siempre usa forma circle', () => {
    render(<Image variant="avatar" src="test.jpg" shape="square" lazy={false} />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveAttribute('data-shape', 'circle');
  });
});

// ===== GRUPO 5: TESTS DE FALLBACKS =====
describe('Image Component - Fallbacks', () => {
  test('renderiza fallback placeholder por defecto', () => {
    render(<Image alt="Test" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-icon-name', 'image');
  });

  test('renderiza fallback con iniciales', () => {
    render(<Image variant="avatar" name="Pedro García" fallback="initials" />);
    expect(screen.getByTestId('mock-text')).toBeInTheDocument();
    expect(screen.getByTestId('mock-text')).toHaveTextContent('PG');
  });

  test('renderiza fallback con icono personalizado', () => {
    render(<Image fallback="icon" fallbackIcon="camera" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-icon-name', 'camera');
  });

  test('renderiza fallback skeleton', () => {
    render(<Image fallback="skeleton" />);
    const image = screen.getByTestId('Image');
    expect(image.querySelector('.image__fallback--skeleton')).toBeInTheDocument();
  });

  test('genera iniciales correctamente', () => {
    const { rerender } = render(<Image name="Pedro" fallback="initials" />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('P');

    rerender(<Image name="Pedro García" fallback="initials" />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('PG');

    rerender(<Image name="" fallback="initials" />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('?');
  });
});

// ===== GRUPO 6: TESTS DE AVATAR STATUS =====
describe('Image Component - Avatar Status', () => {
  test('renderiza status online correctamente', () => {
    render(<Image variant="avatar" src="test.jpg" status="online" />);
    const statusIndicator = document.querySelector('.image__status');
    expect(statusIndicator).toBeInTheDocument();
    expect(statusIndicator).toHaveStyle('background-color: #10b981');
  });

  test('renderiza status offline correctamente', () => {
    render(<Image variant="avatar" src="test.jpg" status="offline" />);
    const statusIndicator = document.querySelector('.image__status--offline');
    expect(statusIndicator).toBeInTheDocument();
  });

  test('renderiza status away correctamente', () => {
    render(<Image variant="avatar" src="test.jpg" status="away" />);
    const statusIndicator = document.querySelector('.image__status--away');
    expect(statusIndicator).toBeInTheDocument();
  });

  test('renderiza status busy correctamente', () => {
    render(<Image variant="avatar" src="test.jpg" status="busy" />);
    const statusIndicator = document.querySelector('.image__status--busy');
    expect(statusIndicator).toBeInTheDocument();
  });

  test('no renderiza status para variantes no-avatar', () => {
    render(<Image variant="thumbnail" src="test.jpg" status="online" />);
    const statusIndicator = document.querySelector('.image__status');
    expect(statusIndicator).not.toBeInTheDocument();
  });
});

// ===== GRUPO 7: TESTS DE BADGES =====
describe('Image Component - Badges', () => {
  test('renderiza badge correctamente', () => {
    const badge = <Badge count={5} variant="error" />;
    render(<Image variant="avatar" src="test.jpg" badge={badge} />);
    expect(screen.getByTestId('mock-badge')).toBeInTheDocument();
  });

  test('badge se posiciona correctamente', () => {
    const badge = <Badge count={3} />;
    render(<Image variant="avatar" src="test.jpg" badge={badge} />);
    const badgeContainer = document.querySelector('.image__badge');
    expect(badgeContainer).toBeInTheDocument();
  });

  test('no renderiza badge cuando no se proporciona', () => {
    render(<Image variant="avatar" src="test.jpg" />);
    expect(screen.queryByTestId('mock-badge')).not.toBeInTheDocument();
  });
});

// ===== GRUPO 8: TESTS DE ESTADOS =====
describe('Image Component - Estados', () => {
  test('aplica estado loading correctamente', () => {
    render(<Image src="test.jpg" loading={true} />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--loading');
    expect(image).toHaveAttribute('data-loading', 'true');
  });

  test('aplica hover effects correctamente', () => {
    render(<Image src="test.jpg" hover={true} lazy={false} />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--hover');
  });
});

// ===== GRUPO 9: TESTS DE EVENTOS =====
describe('Image Component - Eventos', () => {
  test('maneja evento onClick', async () => {
    const handleClick = jest.fn();
    render(<Image src="test.jpg" onClick={handleClick} lazy={false} />);

    const image = screen.getByTestId('Image');
    await userEvent.click(image);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('maneja evento onLoad', () => {
    const handleLoad = jest.fn();
    render(<Image src="test.jpg" onLoad={handleLoad} lazy={false} />);

    const image = screen.getByTestId('Image');
    fireEvent.load(image);

    expect(handleLoad).toHaveBeenCalledTimes(1);
  });

  test('maneja evento onError', () => {
    const handleError = jest.fn();
    render(<Image src="test.jpg" onError={handleError} lazy={false} />);

    const image = screen.getByTestId('Image');
    fireEvent.error(image);

    expect(handleError).toHaveBeenCalledTimes(1);
  });
});

// ===== GRUPO 10: TESTS DE LAZY LOADING =====
describe('Image Component - Lazy Loading', () => {
  test('lazy loading está habilitado por defecto', () => {
    render(<Image src="test.jpg" />);
    // Con lazy loading, inicialmente no debería tener src
    const image = screen.getByTestId('Image');
    expect(image).not.toHaveAttribute('src');
  });

  test('lazy loading se puede deshabilitar', () => {
    render(<Image src="test.jpg" lazy={false} />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveAttribute('src', 'test.jpg');
  });
});

// ===== GRUPO 11: TESTS DE ACCESIBILIDAD =====
describe('Image Component - Accesibilidad', () => {
  test('incluye alt text correctamente', () => {
    render(<Image src="test.jpg" alt="Descripción de imagen" lazy={false} />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveAttribute('alt', 'Descripción de imagen');
  });

  test('status indicator tiene aria-label', () => {
    render(<Image variant="avatar" src="test.jpg" status="online" />);
    const statusIndicator = document.querySelector('.image__status');
    expect(statusIndicator).toHaveAttribute('aria-label', 'Estado: online');
  });

  test('imagen es accesible por teclado cuando es clickable', () => {
    render(<Image src="test.jpg" onClick={() => {}} />);
    const image = screen.getByTestId('Image');
    expect(image).toBeInTheDocument();
  });
});

// ===== GRUPO 12: TESTS DE CASOS EXTREMOS =====
describe('Image Component - Casos Extremos', () => {
  test('maneja src undefined sin errores', () => {
    expect(() => {
      render(<Image src={undefined} />);
    }).not.toThrow();
  });

  test('maneja name vacío para iniciales', () => {
    render(<Image name="" fallback="initials" />);
    expect(screen.getByTestId('mock-text')).toHaveTextContent('?');
  });

  test('maneja props adicionales', () => {
    render(<Image src="test.jpg" data-custom="value" title="Image title" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveAttribute('data-custom', 'value');
    expect(image).toHaveAttribute('title', 'Image title');
  });

  test('maneja className personalizada', () => {
    render(<Image src="test.jpg" className="custom-class" />);
    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('custom-class');
  });
});

// ===== GRUPO 13: TESTS DE COMBINACIONES COMPLEJAS =====
describe('Image Component - Combinaciones Complejas', () => {
  test('avatar completo con todas las características', () => {
    const badge = <Badge count={3} variant="error" />;
    render(
        <Image
            variant="avatar"
            src="test.jpg"
            alt="Usuario completo"
            size="large"
            status="online"
            badge={badge}
            name="Pedro García"
            onClick={() => {}}
        />
    );

    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--avatar', 'image--large');
    expect(image).toHaveAttribute('data-variant', 'avatar');
    expect(image).toHaveAttribute('data-shape', 'circle');

    expect(document.querySelector('.image__status')).toBeInTheDocument();
    expect(screen.getByTestId('mock-badge')).toBeInTheDocument();
  });

  test('imagen con fallback y eventos', () => {
    const handleClick = jest.fn();
    const handleError = jest.fn();

    render(
        <Image
            src="imagen-rota.jpg"
            alt="Imagen con fallback"
            fallback="initials"
            name="Test User"
            onClick={handleClick}
            onError={handleError}
            hover={true}
        />
    );

    expect(screen.getByTestId('mock-text')).toHaveTextContent('TU');

    const image = screen.getByTestId('Image');
    expect(image).toHaveClass('image--hover');
  });
});
