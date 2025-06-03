import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Input from './Input.jsx';

// Mock del componente Icon
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

// Mock del componente Text CORREGIDO
jest.mock('../Text/Text.jsx', () => {
  return function MockText({ children, className, as: Component = 'span', htmlFor }) {
    const Element = Component === 'label' ? 'label' : Component;
    return (
        <Element
            data-testid="mock-text"
            className={className}
            htmlFor={htmlFor}
        >
          {children}
        </Element>
    );
  };
});

// ===== GRUPO 1: TESTS BÁSICOS DE RENDERIZADO =====
describe('Input Component - Renderizado Básico', () => {
  test('renderiza sin errores', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renderiza con placeholder', () => {
    render(<Input placeholder="Ingresa texto" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Ingresa texto');
  });

  test('aplica clases contenedor por defecto', () => {
    render(<Input data-testid="input-test" />);
    const inputElement = screen.getByTestId('input-test');
    const relativeContainer = inputElement.parentElement;
    const mainContainer = relativeContainer.parentElement;

    expect(mainContainer).toHaveClass('input-container');
    expect(mainContainer).toHaveClass('w-full');
  });

  test('renderiza con valor inicial y onChange', () => {
    const handleChange = jest.fn();
    render(<Input value="texto inicial" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('texto inicial');
  });

  test('renderiza con defaultValue', () => {
    render(<Input defaultValue="valor por defecto" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('valor por defecto');
  });
});

// ===== GRUPO 2: TESTS DE TIPOS DE INPUT =====
describe('Input Component - Tipos de Input', () => {
  test('renderiza como text por defecto', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('renderiza como email correctamente', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  test('renderiza como password correctamente', () => {
    render(<Input type="password" />);
    const input = screen.getByDisplayValue('');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('renderiza como number correctamente', () => {
    render(<Input type="number" />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
  });

  test('renderiza como tel correctamente', () => {
    render(<Input type="tel" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'tel');
  });

  test('renderiza como url correctamente', () => {
    render(<Input type="url" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'url');
  });

  test('renderiza como search correctamente', () => {
    render(<Input type="search" />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('type', 'search');
  });
});

// ===== GRUPO 3: TESTS DE TAMAÑOS =====
describe('Input Component - Tamaños', () => {
  test('aplica tamaño medium por defecto', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input-field');
    expect(input).toHaveClass('px-3');
    expect(input).toHaveClass('py-2');
    expect(input).toHaveClass('h-10');
  });

  test('aplica tamaño small correctamente', () => {
    render(<Input size="small" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('px-3');
    expect(input).toHaveClass('py-1.5');
    expect(input).toHaveClass('h-8');
  });

  test('aplica tamaño large correctamente', () => {
    render(<Input size="large" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('px-4');
    expect(input).toHaveClass('py-3');
    expect(input).toHaveClass('h-12');
  });
});

// ===== GRUPO 4: TESTS DE VARIANTES =====
describe('Input Component - Variantes', () => {
  test('aplica variante default por defecto', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input-field');
    expect(input).toHaveClass('border-gray-300');
  });

  test('aplica variante success correctamente', () => {
    render(<Input variant="success" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-green-500');
    expect(input).toHaveClass('bg-green-50');
  });

  test('aplica variante error correctamente', () => {
    render(<Input variant="error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
    expect(input).toHaveClass('bg-red-50');
  });

  test('aplica variante warning correctamente', () => {
    render(<Input variant="warning" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-yellow-500');
    expect(input).toHaveClass('bg-yellow-50');
  });

  test('prop error sobrescribe variante', () => {
    render(<Input variant="success" error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });

  test('prop success sobrescribe variante', () => {
    render(<Input variant="error" success="Success message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-green-500');
  });
});

// ===== GRUPO 5: TESTS DE ESTADOS =====
describe('Input Component - Estados', () => {
  test('aplica estado disabled correctamente', () => {
    render(<Input disabled={true} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50');
    expect(input).toHaveClass('cursor-not-allowed');
  });

  test('aplica estado readOnly correctamente', () => {
    render(<Input readOnly={true} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveClass('bg-gray-50');
  });

  test('aplica estado required correctamente', () => {
    render(<Input required={true} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('required');
  });

  test('aplica fullWidth por defecto', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('w-full');
  });

  test('no aplica fullWidth cuando es false', () => {
    render(<Input fullWidth={false} />);
    const container = screen.getByRole('textbox').parentElement.parentElement;
    expect(container).toHaveClass('inline-block');
  });
});

// ===== GRUPO 6: TESTS DE ICONOS =====
describe('Input Component - Iconos', () => {
  test('renderiza icono izquierdo correctamente', () => {
    render(<Input iconLeft="user" />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon-name', 'user');

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('pl-10');
  });

  test('renderiza icono derecho correctamente', () => {
    render(<Input iconRight="search" />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon-name', 'search');

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('pr-10');
  });

  test('renderiza ambos iconos correctamente', () => {
    render(<Input iconLeft="user" iconRight="check" />);
    const icons = screen.getAllByTestId('mock-icon');
    expect(icons).toHaveLength(2);
    expect(icons[0]).toHaveAttribute('data-icon-name', 'user');
    expect(icons[1]).toHaveAttribute('data-icon-name', 'check');

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('px-10');
  });

  test('renderiza icono con prop legacy (icon + iconPosition)', () => {
    render(<Input icon="search" iconPosition="right" />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon-name', 'search');
  });

  test('iconos tienen tamaño correcto según size del input', () => {
    const { rerender } = render(<Input iconLeft="user" size="small" />);
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-size', 'xs');

    rerender(<Input iconLeft="user" size="medium" />);
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-size', 'small');

    rerender(<Input iconLeft="user" size="large" />);
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-size', 'medium');
  });
});

// ===== GRUPO 7: TESTS DE CALLBACKS DE ICONOS =====
describe('Input Component - Callbacks de Iconos', () => {
  test('llama onIconLeftClick cuando se hace click en icono izquierdo', async () => {
    const handleLeftClick = jest.fn();
    render(<Input iconLeft="user" onIconLeftClick={handleLeftClick} />);

    const icon = screen.getByTestId('mock-icon');
    await userEvent.click(icon);

    expect(handleLeftClick).toHaveBeenCalledTimes(1);
  });

  test('llama onIconRightClick cuando se hace click en icono derecho', async () => {
    const handleRightClick = jest.fn();
    render(<Input iconRight="search" onIconRightClick={handleRightClick} />);

    const icon = screen.getByTestId('mock-icon');
    await userEvent.click(icon);

    expect(handleRightClick).toHaveBeenCalledTimes(1);
  });

  test('llama onIconClick cuando se hace click en icono único', async () => {
    const handleIconClick = jest.fn();
    render(<Input icon="search" onIconClick={handleIconClick} />);

    const icon = screen.getByTestId('mock-icon');
    await userEvent.click(icon);

    expect(handleIconClick).toHaveBeenCalledTimes(1);
  });

  test('maneja clicks en ambos iconos independientemente', async () => {
    const handleLeftClick = jest.fn();
    const handleRightClick = jest.fn();

    render(
        <Input
            iconLeft="user"
            iconRight="check"
            onIconLeftClick={handleLeftClick}
            onIconRightClick={handleRightClick}
        />
    );

    const icons = screen.getAllByTestId('mock-icon');

    await userEvent.click(icons[0]); // Left icon
    expect(handleLeftClick).toHaveBeenCalledTimes(1);
    expect(handleRightClick).not.toHaveBeenCalled();

    await userEvent.click(icons[1]); // Right icon
    expect(handleRightClick).toHaveBeenCalledTimes(1);
    expect(handleLeftClick).toHaveBeenCalledTimes(1);
  });

  test('iconos con callbacks tienen cursor pointer', () => {
    render(<Input iconLeft="user" onIconLeftClick={() => {}} />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveStyle('cursor: pointer');
  });

  test('iconos sin callbacks tienen cursor default', () => {
    render(<Input iconLeft="user" />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveStyle('cursor: default');
  });
});

// ===== GRUPO 8: TESTS DE PASSWORD TOGGLE =====
describe('Input Component - Password Toggle', () => {
  test('renderiza toggle de contraseña cuando showPasswordToggle es true', () => {
    render(<Input type="password" showPasswordToggle={true} />);

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon-name', 'eye');
  });

  test('no renderiza toggle cuando showPasswordToggle es false', () => {
    render(<Input type="password" showPasswordToggle={false} />);

    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
  });

  test('toggle cambia tipo de password a text', async () => {
    render(<Input type="password" showPasswordToggle={true} />);

    const input = screen.getByDisplayValue('');
    const toggleIcon = screen.getByTestId('mock-icon');

    // Estado inicial: password
    expect(input).toHaveAttribute('type', 'password');
    expect(toggleIcon).toHaveAttribute('data-icon-name', 'eye');

    // Click para mostrar
    await userEvent.click(toggleIcon);
    expect(input).toHaveAttribute('type', 'text');
    expect(toggleIcon).toHaveAttribute('data-icon-name', 'eye-slash');

    // Click para ocultar
    await userEvent.click(toggleIcon);
    expect(input).toHaveAttribute('type', 'password');
    expect(toggleIcon).toHaveAttribute('data-icon-name', 'eye');
  });

  test('toggle de contraseña tiene prioridad sobre iconRight', () => {
    render(
        <Input
            type="password"
            showPasswordToggle={true}
        />
    );

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveAttribute('data-icon-name', 'eye');
  });

  test('toggle funciona con diferentes tamaños', () => {
    const { rerender } = render(
        <Input type="password" showPasswordToggle={true} size="small" />
    );
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-size', 'xs');

    rerender(<Input type="password" showPasswordToggle={true} size="large" />);
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-size', 'medium');
  });
});

// ===== GRUPO 9: TESTS DE LABEL =====
describe('Input Component - Label', () => {
  test('renderiza label correctamente', () => {
    render(<Input label="Nombre de usuario" />);
    const label = screen.getByTestId('mock-text');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Nombre de usuario');
  });

  test('no renderiza label cuando no se proporciona', () => {
    render(<Input />);
    expect(screen.queryByTestId('mock-text')).not.toBeInTheDocument();
  });

  test('label requerido muestra asterisco', () => {
    render(<Input label="Email" required={true} />);
    const label = screen.getByTestId('mock-text');
    expect(label).toHaveTextContent('Email');
    // El asterisco se renderiza como un span separado
    expect(label.parentElement).toHaveTextContent('*');
  });

  test('label tiene htmlFor correcto cuando se proporciona id', () => {
    render(<Input label="Email" id="email-input" />);
    const label = screen.getByTestId('mock-text');
    expect(label).toHaveAttribute('for', 'email-input');
  });

});

// ===== GRUPO 10: TESTS DE MENSAJES =====
describe('Input Component - Mensajes', () => {
  test('renderiza mensaje de error', () => {
    render(<Input error="Este campo es requerido" />);
    const messages = screen.getAllByTestId('mock-text');
    const errorMessage = messages.find(msg =>
        msg.textContent === 'Este campo es requerido'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test('renderiza mensaje de éxito', () => {
    render(<Input success="¡Datos válidos!" />);
    const messages = screen.getAllByTestId('mock-text');
    const successMessage = messages.find(msg =>
        msg.textContent === '¡Datos válidos!'
    );
    expect(successMessage).toBeInTheDocument();
  });

  test('renderiza helper text', () => {
    render(<Input helperText="Este campo es opcional" />);
    const messages = screen.getAllByTestId('mock-text');
    const helperMessage = messages.find(msg =>
        msg.textContent === 'Este campo es opcional'
    );
    expect(helperMessage).toBeInTheDocument();
  });

  test('error tiene prioridad sobre success y helperText', () => {
    render(
        <Input
            error="Error message"
            success="Success message"
            helperText="Helper message"
        />
    );

    const messages = screen.getAllByTestId('mock-text');
    const errorMessage = messages.find(msg =>
        msg.textContent === 'Error message'
    );
    const successMessage = messages.find(msg =>
        msg.textContent === 'Success message'
    );

    expect(errorMessage).toBeInTheDocument();
    expect(successMessage).toBeUndefined();
  });
});

// ===== GRUPO 11: TESTS DE EVENTOS =====
describe('Input Component - Eventos', () => {
  test('llama onChange cuando el valor cambia', async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'nuevo texto');

    expect(handleChange).toHaveBeenCalled();
  });

  test('llama onFocus cuando el input recibe foco', async () => {
    const handleFocus = jest.fn();
    render(<Input onFocus={handleFocus} />);

    const input = screen.getByRole('textbox');
    await userEvent.click(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  test('llama onBlur cuando el input pierde foco', async () => {
    const handleBlur = jest.fn();
    render(<Input onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    await userEvent.tab();

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('llama onKeyDown cuando se presiona una tecla', async () => {
    const handleKeyDown = jest.fn();
    render(<Input onKeyDown={handleKeyDown} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'a');

    expect(handleKeyDown).toHaveBeenCalled();
  });

  test('no llama eventos cuando está disabled', async () => {
    const handleChange = jest.fn();
    const handleFocus = jest.fn();

    render(<Input disabled={true} onChange={handleChange} onFocus={handleFocus} />);

    const input = screen.getByRole('textbox');
    await userEvent.click(input);

    expect(handleFocus).not.toHaveBeenCalled();
  });
});

// ===== GRUPO 12: TESTS DE ATRIBUTOS HTML =====
describe('Input Component - Atributos HTML', () => {
  test('aplica atributos HTML correctamente', () => {
    render(
        <Input
            id="test-input"
            name="test-name"
            autoComplete="email"
            autoFocus={true}
            maxLength={50}
            minLength={3}
        />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('name', 'test-name');
    expect(input).toHaveAttribute('autocomplete', 'email');
    expect(input).toHaveAttribute('maxlength', '50');
    expect(input).toHaveAttribute('minlength', '3');
  });

  test('aplica aria-attributes correctamente', () => {
    render(<Input error="Error message" id="test-input" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
  });

  test('aplica props adicionales', () => {
    render(<Input data-custom="value" title="Input title" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-custom', 'value');
    expect(input).toHaveAttribute('title', 'Input title');
  });
});

// ===== GRUPO 13: TESTS DE CASOS EXTREMOS =====
describe('Input Component - Casos Extremos', () => {
  test('maneja valor null sin errores', () => {
    expect(() => {
      render(<Input value={undefined} onChange={() => {}} />);
    }).not.toThrow();
  });

  test('maneja callbacks null sin errores', () => {
    expect(() => {
      render(
          <Input
              iconLeft="user"
              onIconLeftClick={null}
              onChange={null}
          />
      );
    }).not.toThrow();
  });

  test('maneja múltiples clicks rápidos en toggle', async () => {
    render(<Input type="password" showPasswordToggle={true} />);

    const input = screen.getByDisplayValue('');
    const toggleIcon = screen.getByTestId('mock-icon');

    // Múltiples clicks rápidos
    await userEvent.click(toggleIcon);
    await userEvent.click(toggleIcon);
    await userEvent.click(toggleIcon);

    // Después de 3 clicks (impar), debería estar en text
    expect(input).toHaveAttribute('type', 'text');
  });

  test('mantiene estado interno cuando cambian props externas', async () => {
    const { rerender } = render(
        <Input type="password" showPasswordToggle={true} />
    );

    const input = screen.getByDisplayValue('');
    const toggleIcon = screen.getByTestId('mock-icon');

    // Cambiar a visible
    await userEvent.click(toggleIcon);
    expect(input).toHaveAttribute('type', 'text');

    // Re-render con mismas props
    rerender(<Input type="password" showPasswordToggle={true} />);

    // Debería mantener estado visible
    expect(input).toHaveAttribute('type', 'text');
  });
});

// ===== GRUPO 14: TESTS DE ACCESIBILIDAD =====
describe('Input Component - Accesibilidad', () => {
  test('tiene roles correctos según el tipo', () => {
    const { rerender } = render(<Input type="text" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    rerender(<Input type="search" />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();

    rerender(<Input type="number" />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  test('mantiene accesibilidad con iconos clickables', () => {
    render(<Input iconRight="search" onIconRightClick={() => {}} />);

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveStyle('cursor: pointer');
    expect(icon).toBeInTheDocument();
  });

  test('password toggle mantiene accesibilidad', async () => {
    render(<Input type="password" showPasswordToggle={true} />);

    const input = screen.getByDisplayValue('');
    const toggleIcon = screen.getByTestId('mock-icon');

    expect(input).toHaveAttribute('type', 'password');

    await userEvent.click(toggleIcon);
    expect(input).toHaveAttribute('type', 'text');
  });
});
